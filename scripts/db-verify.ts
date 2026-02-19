import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function verify() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        console.error('DATABASE_URL is not defined in .env');
        process.exit(1);
    }

    try {
        const regex = /^mysql:\/\/([^:]+):(.*)@([^:]+):(\d+)\/(.+)$/;
        const match = databaseUrl.match(regex);
        if (!match) { throw new Error('Invalid DATABASE_URL'); }

        const [, user, password, host, port, database] = match;

        const connection = await mysql.createConnection({
            host, user, password, database, port: parseInt(port)
        });

        console.log('\n🔍 --- Database Verification ---');

        const [alunosRows]: any = await connection.query('SELECT COUNT(*) as count FROM alunos');
        console.log(`✅ Alunos: ${alunosRows[0].count} records`);

        const [funcionariosRows]: any = await connection.query('SELECT COUNT(*) as count FROM rh_funcionarios');
        console.log(`✅ Funcionarios: ${funcionariosRows[0].count} records`);

        const [departamentosRows]: any = await connection.query('SELECT COUNT(*) as count FROM rh_departamentos');
        console.log(`✅ Departamentos: ${departamentosRows[0].count} records`);

        const [usersRows]: any = await connection.query('SELECT COUNT(*) as count FROM users');
        console.log(`✅ Users: ${usersRows[0].count} records`);

        console.log('---------------------------------\n');

        await connection.end();
    } catch (error) {
        console.error('❌ Verification failed:', error);
        process.exit(1);
    }
}

verify();
