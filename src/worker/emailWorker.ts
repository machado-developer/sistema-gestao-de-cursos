import dotenv from "dotenv";
import { randomUUID } from "node:crypto";
import path from "node:path";

// Load environment variables
dotenv.config();

// Fix module resolution for external execution if needed
// tsx handles this mostly, but we'll use relative imports that are stable
import { PrismaClient } from "../generated/client";
import { MailService } from "../services/mailService";
import { ServerDocumentService } from "../services/serverDocumentService";
import { RHService } from "../services/rhService";

const prisma = new PrismaClient();

const CONCURRENCY = 5; // Adjust based on SMTP server limits
const BATCH_SIZE = 10;
const WORKER_ID = randomUUID();
const LOCK_DURATION_MINUTES = 5;

const meses = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

async function processJob(job: any) {
    const payload = JSON.parse(job.payload);
    console.log(`[Worker ${WORKER_ID}] Processing job ${job.id} for ${payload.recipientName}...`);

    try {
        if (job.type === "SALARY_SLIP") {
            const folha = await RHService.obterFolhaPorId(payload.folhaId);

            if (!folha) {
                throw new Error(`Folha de pagamento ${payload.folhaId} não encontrada.`);
            }

            const period = `${meses[folha.mes]} / ${folha.ano}`;
            const pdfBuffer = await ServerDocumentService.generateSalarySlipPDF(folha);

            const result = await MailService.sendSalarySlipEmail(
                payload.recipientEmail,
                payload.recipientName,
                period,
                pdfBuffer
            );

            if (result.success) {
                await prisma.emailJob.update({
                    where: { id: job.id },
                    data: {
                        status: "COMPLETED",
                        processedAt: new Date(),
                        workerId: null, // Clear worker association
                        lockedUntil: null
                    }
                });
                console.log(`[Worker ${WORKER_ID}] Job ${job.id} completed.`);
            } else {
                throw new Error(JSON.stringify(result.error));
            }
        }
    } catch (error: any) {
        console.error(`[Worker ${WORKER_ID}] Error processing job ${job.id}:`, error);

        // Exponential backoff or simple retry logic
        const nextAttempt = job.attempts + 1;
        const isLastAttempt = nextAttempt >= (job.maxAttempts || 3);

        await prisma.emailJob.update({
            where: { id: job.id },
            data: {
                status: isLastAttempt ? "FAILED" : "PENDING",
                lastError: error.message || String(error),
                workerId: null,
                lockedUntil: null
            }
        });
    }
}

async function runIteration() {
    console.log(`[Worker ${WORKER_ID}] Checking for jobs...`);

    // Atomic claim using raw SQL (MySQL/MariaDB)
    // We claim PENDING jobs or PROCESSING jobs that have timed out
    const lockTime = new Date();
    lockTime.setMinutes(lockTime.getMinutes() + LOCK_DURATION_MINUTES);

    try {
        // We use $executeRawUnsafe because $executeRaw with placeholders might have issues with table names or complex WHERE in some Prisma versions
        // but here we just need to update with placeholders for values
        await prisma.$executeRaw`
            UPDATE sys_email_jobs 
            SET status = 'PROCESSING', 
                workerId = ${WORKER_ID}, 
                lockedUntil = ${lockTime},
                attempts = attempts + 1
            WHERE status = 'PENDING' 
               OR (status = 'PROCESSING' AND lockedUntil < NOW())
            ORDER BY createdAt ASC
            LIMIT ${BATCH_SIZE}
        `;

        const claimedJobs = await prisma.emailJob.findMany({
            where: {
                workerId: WORKER_ID,
                status: 'PROCESSING'
            }
        });

        if (claimedJobs.length === 0) {
            return;
        }

        console.log(`[Worker ${WORKER_ID}] Claimed ${claimedJobs.length} jobs. Processing in parallel (limit ${CONCURRENCY})...`);

        // Simple parallel processing with concurrency control
        const chunks = [];
        for (let i = 0; i < claimedJobs.length; i += CONCURRENCY) {
            chunks.push(claimedJobs.slice(i, i + CONCURRENCY));
        }

        for (const chunk of chunks) {
            await Promise.all(chunk.map(job => processJob(job)));
        }

    } catch (error) {
        console.error(`[Worker ${WORKER_ID}] Fatal error in iteration:`, error);
    }
}

async function main() {
    console.log(`[Worker ${WORKER_ID}] Email Worker started...`);

    // Graceful shutdown
    let isRunning = true;
    process.on('SIGINT', () => {
        console.log(`[Worker ${WORKER_ID}] Shutting down...`);
        isRunning = false;
    });

    while (isRunning) {
        await runIteration();
        // Wait 10 seconds between polls if no jobs were found, or just keep going
        await new Promise(resolve => setTimeout(resolve, 10000));
    }

    await prisma.$disconnect();
    console.log(`[Worker ${WORKER_ID}] Stopped.`);
}

main();
