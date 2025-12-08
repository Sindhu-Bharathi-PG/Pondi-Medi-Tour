const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');

const connectionString = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/medical_tourism';

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

module.exports = db;
