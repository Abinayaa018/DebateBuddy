import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import apiV1 from './routes';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1', apiV1);

// basic health
app.get('/health', (_, res) => res.json({ ok: true }));

// connect to mongo
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai_argue_buddy';
mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.warn('MongoDB connection error:', err.message);
});

export default app;
