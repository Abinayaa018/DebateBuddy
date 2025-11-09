/**
 * Simple seed script (run with ts-node)
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/user.model';

async function run() {
  await mongoose.connect(process.env.MONGO_URI || '');
  await User.deleteMany({});
  await User.create({ name: 'Demo', email: 'demo@example.com', password: 'demo' });
  console.log('Seeded demo user: demo@example.com / demo');
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
