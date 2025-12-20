const postgres = require('postgres');
const DATABASE_URL = 'postgresql://neondb_owner:npg_iwOG4Fq9QvBg@ep-red-hall-a1uesazg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function listTables() {
  const sql = postgres(DATABASE_URL);
  try {
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('Use tables:', tables.map(t => t.table_name));
  } catch (e) {
    console.error(e);
  } finally {
    await sql.end();
  }
}
listTables();
