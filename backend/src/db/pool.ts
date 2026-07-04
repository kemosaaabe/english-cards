import pg from 'pg';

const { Pool } = pg;

const databaseUrl =
  process.env.DATABASE_URL ??
  'postgres://english_cards:english_cards@localhost:5432/english_cards';

export const pool = new Pool({
  connectionString: databaseUrl,
});
