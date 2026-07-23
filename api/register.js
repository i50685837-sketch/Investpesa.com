import { createUser, getUser } from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, name, phone } = req.body;
  
  const exists = await getUser(email);
  if (exists) return res.status(400).json({ error: 'User exists' });
  
  const user = await createUser(email, name, phone);
  res.json({ success: true, user });
}
