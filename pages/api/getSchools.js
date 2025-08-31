import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });
  const db = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'schoolDB',
});

  try {
    const [rows] = await db.execute('SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY id DESC');
    res.status(200).json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Database error: ' + e.message });
  } finally {
    await db.end();
  }
}
