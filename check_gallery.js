require('dotenv').config({ path: './backend/.env' });
const postgres = require('postgres');

async function checkGalleryData() {
    const sql = postgres(process.env.DATABASE_URL);
    
    try {
        console.log('Checking hospital gallery data...\n');
        
        const hospitals = await sql`
            SELECT id, name, gallery, "coverUrl" 
            FROM hospital_details 
            LIMIT 3
        `;
        
        hospitals.forEach(h => {
            console.log(`Hospital: ${h.name} (ID: ${h.id})`);
            console.log(`Gallery type: ${typeof h.gallery}`);
            console.log(`Gallery value:`, h.gallery);
            console.log(`Gallery isArray: ${Array.isArray(h.gallery)}`);
            console.log(`CoverUrl:`, h.coverUrl);
            console.log('---\n');
        });
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sql.end();
    }
}

checkGalleryData();
