const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const prisma = new PrismaClient();

async function checkStatus() {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    console.log("Checando status do banco de dados...");
    try {
        // 1. Check if rh_adiantamentos exists
        const tables = await prisma.$queryRaw`SHOW TABLES LIKE 'rh_adiantamentos'`;
        console.log("Tabela rh_adiantamentos:", tables.length > 0 ? "EXISTE" : "NÃO EXISTE");

        // 2. Check column in rh_folhas_pagamento
        const columns = await prisma.$queryRaw`SHOW COLUMNS FROM rh_folhas_pagamento LIKE 'total_adiantamentos'`;
        console.log("Coluna total_adiantamentos em rh_folhas_pagamento:", columns.length > 0 ? "EXISTE" : "NÃO EXISTE");

        // 3. List all entries in _prisma_migrations
        const migrations = await prisma.$queryRaw`SELECT migration_name, finished_at FROM _prisma_migrations ORDER BY started_at DESC`;
        console.log("Todas as migrações no banco REMOTO:");
        console.table(migrations);

    } catch (error) {
        console.error("Erro ao verificar banco:", error);
    } finally {
        await prisma.$disconnect();
    }
}

checkStatus();
