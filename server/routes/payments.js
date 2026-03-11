import express from 'express';
import { razorpay, verifyWebhook } from '../services/razorpayService.js';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../utils/prisma.js';

const router = express.Router();

router.post('/order', requireAuth, async (req, res) => {
  const { amount = 49900, currency = 'INR', plan = 'teacher_pro' } = req.body;
  const order = await razorpay.orders.create({ amount, currency, receipt: `rcpt_${Date.now()}`, notes: { userId: req.user.id, plan } });
  res.json(order);
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  if (!verifyWebhook(req.body, signature)) return res.status(400).send('Invalid signature');
  const event = JSON.parse(req.body.toString());
  if (event.event === 'payment.captured') {
    const userId = event.payload.payment.entity.notes?.userId;
    const plan = event.payload.payment.entity.notes?.plan || 'teacher_pro';
    if (userId) await prisma.user.update({ where: { id: userId }, data: { plan } });
  }
  res.json({ ok: true });
});

export default router;
