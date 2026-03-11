import express from 'express';
import path from 'path';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../utils/prisma.js';
import { generatePdf } from '../services/pdfGenerator.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  const papers = await prisma.paper.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: 'desc' } });
  res.json(papers);
});

router.post('/', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (user.plan === 'free' && user.papersUsed >= 5) return res.status(402).json({ message: 'Free tier limit reached', upgradeRequired: true });
  const paper = await prisma.paper.create({ data: { ...req.body, userId: req.user.id } });
  await prisma.user.update({ where: { id: req.user.id }, data: { papersUsed: { increment: 1 } } });
  res.status(201).json(paper);
});

router.get('/:id', requireAuth, async (req, res) => {
  const paper = await prisma.paper.findFirst({ where: { id: req.params.id, userId: req.user.id } });
  if (!paper) return res.status(404).json({ message: 'Paper not found' });
  res.json(paper);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await prisma.paper.deleteMany({ where: { id: req.params.id, userId: req.user.id } });
  res.json({ message: 'Deleted' });
});

router.get('/:id/pdf', requireAuth, async (req, res) => {
  const paper = await prisma.paper.findFirst({ where: { id: req.params.id, userId: req.user.id } });
  if (!paper) return res.status(404).json({ message: 'Paper not found' });
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  const pdfPath = await generatePdf(paper, { instituteName: user.instituteName || user.name, instituteLogo: user.instituteLogo });
  res.sendFile(path.resolve(pdfPath));
});

router.get('/:id/answerkey', requireAuth, async (req, res) => {
  const paper = await prisma.paper.findFirst({ where: { id: req.params.id, userId: req.user.id } });
  if (!paper) return res.status(404).json({ message: 'Paper not found' });
  const mock = { ...paper, questions: (paper.questions || []).map(q => ({ ...q, text: q.answer })) };
  const pdfPath = await generatePdf(mock);
  res.sendFile(path.resolve(pdfPath));
});

export default router;
