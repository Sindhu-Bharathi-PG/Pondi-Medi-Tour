
require('dotenv').config();
const postgres = require('postgres');
const fs = require('fs');

async function checkInquiriesTable() {
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    const logFile = 'inquiries_schema_debug.txt';
    const log = (msg) => {
        console.log(msg);
        fs.appendFileSync(logFile, msg + '\n');
    };

    try {
        fs.writeFileSync(logFile, 'Checking inquiries table...\n');
        
        // 1. Check Columns
        const columns = await sql`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'inquiries';
        `;
        log("Columns in 'inquiries':");
        if (columns.length === 0) {
            log('TABLE NOT FOUND!');
        } else {
            columns.forEach(c => log(`- ${c.column_name} (${c.data_type}) [${c.is_nullable}]`));
        }

        // 2. Check content count
        const count = await sql`SELECT COUNT(*) FROM inquiries`;
        log(`\nTotal rows: ${count[0].count}`);
        
        // 3. Check sample row
        const rows = await sql`SELECT * FROM inquiries LIMIT 1`;
        if (rows.length > 0) {
            log('\nSample Row:');
            log(JSON.stringify(rows[0], null, 2));
        } else {
            log('\nTable is empty.');
        }

    } catch (err) {
        log('Error: ' + err);
        log(err.stack);
    } finally {
        await sql.end();
        process.exit();
    }
}
checkInquiriesTable();
