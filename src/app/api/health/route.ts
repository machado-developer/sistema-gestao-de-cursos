import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    const start = Date.now();
    let dbStatus = "ok";
    let dbError = null;

    try {
        // Test real connection to database
        await prisma.$queryRaw`SELECT 1`;
    } catch (error: any) {
        console.error("Health check DB error:", error);
        dbStatus = "down";
        dbError = error.message;
    }

    const latency = Date.now() - start;
    let serverStatus = "ok";

    // Logic for "slow" server
    if (latency > 1000) {
        serverStatus = "slow";
    }

    const response = {
        status: dbStatus === "ok" ? "ok" : "error",
        server: serverStatus,
        database: dbStatus,
        latency,
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV
    };

    return NextResponse.json(response, {
        status: dbStatus === "ok" ? 200 : 503
    });
}
