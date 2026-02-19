import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

function backup() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        console.error('DATABASE_URL is not defined in .env');
        process.exit(1);
    }

    try {
        // Parse DATABASE_URL: mysql://user:password@host:port/database
        // Using a regex to handle cases with special characters in password
        const regex = /^mysql:\/\/([^:]+):(.*)@([^:]+):(\d+)\/(.+)$/;
        const match = databaseUrl.match(regex);

        if (!match) {
            console.error('Invalid DATABASE_URL format. Expected: mysql://user:password@host:port/database');
            process.exit(1);
        }

        const [, user, password, host, port, database] = match;

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupDir = path.join(process.cwd(), 'backups');
        const backupFile = path.join(backupDir, `backup-${database}-${timestamp}.sql`);

        // Create backups directory if it doesn't exist
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
        }

        console.log(`Starting backup of database: ${database} at ${host}:${port}...`);

        let mysqldumpPath = 'mysqldump';

        // Check if mysqldump is in PATH
        try {
            execSync('mysqldump --version', { stdio: 'ignore' });
        } catch (e) {
            console.log('mysqldump not found in PATH, searching in common locations...');
            const commonPaths = [
                'C:\\Program Files\\MySQL\\MySQL Server 8.4\\bin\\mysqldump.exe',
                'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysqldump.exe',
                'C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysqldump.exe',
                'C:\\xampp\\mysql\\bin\\mysqldump.exe',
                'C:\\Program Files\\MariaDB 10.5\\bin\\mysqldump.exe',
                'C:\\Program Files\\MariaDB 11.4\\bin\\mysqldump.exe'
            ];

            const foundPath = commonPaths.find(p => fs.existsSync(p));
            if (foundPath) {
                console.log(`Found mysqldump at: ${foundPath}`);
                mysqldumpPath = `"${foundPath}"`;
            } else {
                console.error('ERRO: mysqldump não foi encontrado no PATH nem nos locais comuns.');
                console.error('Por favor, instale o MySQL/MariaDB ou adicione o caminho do mysqldump ao seu PATH.');
                process.exit(1);
            }
        }

        // Build mysqldump command
        // We use --result-file to avoid shell redirection issues with large files or binary data
        // Also including --single-transaction for InnoDB to avoid locking tables
        const command = `mysqldump --host=${host} --port=${port} --user=${user} --password="${password}" --single-transaction --routines --triggers ${database} > "${backupFile}"`;

        // Note: On Windows, the redirection > inside execSync might behave differently or expose password to process list briefly.
        // However, mysqldump --result-file is safer.
        // Using --result-file is safer on Windows to avoid redirection issues
        const safeCommand = `${mysqldumpPath} --host=${host} --port=${port} --user=${user} --password="${password}" --single-transaction --routines --triggers --result-file="${backupFile}" ${database}`;

        execSync(safeCommand, { stdio: 'inherit' });

        console.log(`Backup completed successfully: ${backupFile}`);
    } catch (error) {
        console.error('Backup failed:', error);
        process.exit(1);
    }
}

backup();
