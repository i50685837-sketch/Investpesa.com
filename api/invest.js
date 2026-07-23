import { updateUser, getUser, addTransaction } from '../lib/db.js';

export default async function handler(req, res) {
  const { email, amount, profit } = req.body;
  
  const user = await getUser(email);
  if (user.balance < amount) return res.status(400).json({ error: 'Insufficient balance' });
  
  await updateUser(email, { 
    balance: user.balance - amount,
    earned: user.earned + profit
  });
  
  await addTransaction(email, { type: 'invest', method: 'Plan', amount: -amount, status: 'Active' });
  
  // After 3 hours add profit back - you’ll need a cron job for this
  setTimeout(async () => {
    const u = await getUser(email);
    await updateUser(email, { balance: u.balance + amount + profit });
    await addTransaction(email, { type: 'profit', method: 'Plan Profit', amount: profit, status: 'Success' });
  }, 3 * 60 * 60 * 1000);
  
  res.json({ success: true });
}
