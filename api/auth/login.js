import pg from 'pg';
import crypto from 'crypto';
const { Client } = pg;

function hashPassword(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) reject(err);
      else resolve(key.toString('hex'));
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST required' });

  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  const normalizedEmail = email.toLowerCase().trim();
  const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

  try {
    await client.connect();

    const result = await client.query('SELECT * FROM users WHERE email = $1', [normalizedEmail]);
    if (result.rows.length === 0) {
      await client.end();
      return res.status(401).json({ error: 'No account found with this email. Please create an account.' });
    }

    const user = result.rows[0];
    const hash = await hashPassword(password, user.salt);

    if (hash !== user.password_hash) {
      await client.end();
      return res.status(401).json({ error: 'Incorrect password. Please try again.' });
    }

    await client.query('UPDATE users SET updated_at = NOW() WHERE id = $1', [user.id]);
    await client.end();

    return res.status(200).json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, trialStart: Number(user.trial_start), paid: user.paid, plan: user.plan },
    });
  } catch (err) {
    try { await client.end(); } catch {}
    return res.status(500).json({ error: 'Login failed: ' + err.message });
  }
}
