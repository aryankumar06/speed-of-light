import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import generateRoutes from './routes/generate.js';
import paperRoutes from './routes/papers.js';
import questionRoutes from './routes/questions.js';
import paymentRoutes from './routes/payments.js';
import { apiLimiter } from './middleware/rateLimit.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(apiLimiter);

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/papers', paperRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/payments', paymentRoutes);

app.use((err, _, res, __) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Unexpected server error' });
});

app.listen(process.env.PORT || 4000, () => console.log(`PaperMint API running on ${process.env.PORT || 4000}`));
