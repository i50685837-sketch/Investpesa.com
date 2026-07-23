import { updateUser, getUser, addTransaction } from '../lib/db.js';

export default async function handler(req, res) {
  const { email, method, amount } = req.body;
  let amt = parseFloat(amount);
  if (method === 'PayPal' || method === 'Crypto') amt = amt * 150; // USD to KES
  
  const user = await getUser(email);
  await updateUser(email, { balance: user.balance + amt });
  await addTransaction(email, { type: 'deposit', method, amount: amt, status: 'Success' });
  
  res.json({ success: true, balance: user.balance + amt });
}
