const mariadb = require('mariadb');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
const dbUrl = process.env.DATABASE_URL;

console.log('--- CONNECTION TEST ---');
console.log('ENV LOADED:', !!dbUrl);
if (dbUrl) {
    console.log('URL START:', dbUrl.substring(0, 15));

    // Try to parse manually to see if it makes sense
    try {
        const pool = mariadb.createPool(dbUrl);
        pool.getConnection()
            .then(conn => {
                console.log('SUCCESS: Connected to MariaDB');
                conn.release();
                pool.end();
            })
            .catch(err => {
                console.error('FAILURE: Could not connect:', err.message);
                pool.end();
            });
    } catch (e) {
        console.error('PARSE ERROR:', e.message);
    }
} else {
    console.error('ERROR: DATABASE_URL not found in environment');
}
