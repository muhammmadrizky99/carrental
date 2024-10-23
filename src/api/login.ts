// pages/api/login.ts
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

// Simulasi fungsi untuk verifikasi email dan password dari database
// Dalam implementasi nyata, Anda akan menghubungkan ini ke database Anda
const findUserByEmailAndPassword = (email: string, password: string) => {
  // Contoh user yang ditemukan (pseudo code)
  if (email === 'user@example.com' && password === 'password123') {
    return { id: 'user123', email };
  }
  return null;
};

// Fungsi untuk membuat JWT
function createToken(userId: string) {
  const SECRET_KEY = process.env.JWT_SECRET || '7v7rrh56eXRmUiNLxs8Sz/3PA5lmhQlRTfChrfwQEmE=';

  const payload = { userId };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token berlaku 1 jam

  return token;
}

// API handler untuk login
export default function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Verifikasi email dan password
    const user = findUserByEmailAndPassword(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Buat token JWT
    const token = createToken(user.id);

    // Kirim token ke client
    return res.status(200).json({ token });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
