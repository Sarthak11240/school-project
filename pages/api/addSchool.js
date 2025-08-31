import nextConnect from 'next-connect';
import multer from 'multer';
import mysql from 'mysql2/promise';
import path from 'path';

// Ensure the upload directory exists (relative to project root)
const uploadDir = './public/schoolImages';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error(error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.use(upload.single('image'));

apiRoute.post(async (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  if (!req.file) return res.status(400).json({ error: 'Image is required' });

  // Basic validation server-side
  if (!name || !address || !city || !state || !contact || !email_id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Email quick check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email_id)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const image = req.file.filename;

  const db = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'schoolDB',
});


  try {
    await db.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, image, email_id]
    );
    res.status(200).json({ message: 'School added successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Database error: ' + e.message });
  } finally {
    await db.end();
  }
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream for multer
  },
};

export default apiRoute;
