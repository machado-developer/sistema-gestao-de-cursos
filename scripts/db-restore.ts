import fs from 'fs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

async function restore() {
    const databaseUrl = process.env.DATABASE_URL;
    // Get backup file from command line argument or use the specific one
    const backupFilePath = process.argv[2] || 'backups/backup-nt_nextech_db-2026-02-19T12-32-00-459Z.sql';

    if (!databaseUrl) {
        console.error('DATABASE_URL is not defined in .env');
        process.exit(1);
    }

    try {
        // Parse DATABASE_URL: mysql://user:password@host:port/database
        const regex = /^mysql:\/\/([^:]+):(.*)@([^:]+):(\d+)\/(.+)$/;
        const match = databaseUrl.match(regex);

        if (!match) {
            console.error('Invalid DATABASE_URL format. Expected: mysql://user:password@host:port/database');
            process.exit(1);
        }

        const [, user, password, host, port, database] = match;

        console.log(`🚀 Connecting to remote database: ${database} at ${host}:${port}...`);

        const connection = await mysql.createConnection({
            host,
            user,
            password,
            database: database,
            port: parseInt(port),
            multipleStatements: true,
            connectTimeout: 60000 // 1 minute timeout
        });

        const absoluteBackupPath = path.isAbsolute(backupFilePath)
            ? backupFilePath
            : path.join(process.cwd(), backupFilePath);

        if (!fs.existsSync(absoluteBackupPath)) {
            console.error(`❌ Backup file not found: ${absoluteBackupPath}`);
            process.exit(1);
        }

        console.log(`📖 Reading backup file: ${absoluteBackupPath}...`);
        const sql = fs.readFileSync(absoluteBackupPath, 'utf8');

        console.log('⏳ Restoring data (this may take a few moments)...');

        // Execute the entire SQL dump
        await connection.query(sql);

        console.log('✅ Restoration completed successfully!');
        await connection.end();
    } catch (error) {
        console.error('❌ Restoration failed:', error);
        process.exit(1);
    }
}

restore().catch(err => {
    console.error('Unhandled error during restoration:', err);
    process.exit(1);
});
