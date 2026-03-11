import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../utils/prisma.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  const { subject, topic, type, difficulty, q } = req.query;
  const questions = await prisma.question.findMany({
    where: {
      userId: req.user.id,
      ...(subject ? { subject } : {}),
      ...(topic ? { topic } : {}),
      ...(type ? { type } : {}),
      ...(difficulty ? { difficulty } : {}),
      ...(q ? { text: { contains: q, mode: 'insensitive' } } : {})
    }
  });
  res.json(questions);
});

router.post('/', requireAuth, async (req, res) => {
  const question = await prisma.question.create({ data: { ...req.body, userId: req.user.id } });
  res.status(201).json(question);
});

router.put('/:id', requireAuth, async (req, res) => {
  const question = await prisma.question.update({ where: { id: req.params.id }, data: req.body });
  res.json(question);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await prisma.question.deleteMany({ where: { id: req.params.id, userId: req.user.id } });
  res.json({ message: 'Deleted' });
});

export default router;
