import pg from 'pg';
const { Client } = pg;

export default async function handler(req, res) {
  const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        trial_start BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000),
        paid BOOLEAN NOT NULL DEFAULT false,
        plan TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    const result = await client.query('SELECT COUNT(*) as ct FROM users');
    await client.end();
    return res.status(200).json({ success: true, message: 'Users table ready', userCount: result.rows[0].ct });
  } catch (err) {
    try { await client.end(); } catch {}
    return res.status(500).json({ error: err.message });
  }
}
