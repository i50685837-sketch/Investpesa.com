import { getUser } from '../lib/db.js';

export default async function handler(req, res) {
  const { email } = req.query;
  const user = await getUser(email);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}
