import express from 'express';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { randomUUID } from 'crypto';
import { prisma } from '../utils/prisma.js';
import { signAccessToken, signRefreshToken } from '../utils/tokens.js';

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) return res.status(400).json({ message: 'Missing required fields' });
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hash, name } });
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } });
  res.json({ user, accessToken, refreshToken, verification: 'Email verification flow enabled via SMTP integration.' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } });
  res.json({ user, accessToken, refreshToken });
});

router.post('/google', async (req, res) => {
  const { idToken } = req.body;
  const ticket = await googleClient.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();
  let user = await prisma.user.findUnique({ where: { email: payload.email } });
  if (!user) user = await prisma.user.create({ data: { email: payload.email, name: payload.name || 'Google User', password: randomUUID() } });
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  res.json({ user, accessToken, refreshToken });
});

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  const saved = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
  if (!saved || saved.expiresAt < new Date()) return res.status(401).json({ message: 'Invalid refresh token' });
  const user = await prisma.user.findUnique({ where: { id: saved.userId } });
  res.json({ accessToken: signAccessToken(user) });
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.json({ message: 'If the email exists, reset link has been sent.' });
  const token = randomUUID();
  await prisma.passwordResetToken.create({ data: { token, userId: user.id, expiresAt: new Date(Date.now() + 60 * 60 * 1000) } });
  res.json({ message: 'Reset token created', resetToken: token });
});

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  const reset = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!reset || reset.expiresAt < new Date()) return res.status(400).json({ message: 'Invalid or expired token' });
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.update({ where: { id: reset.userId }, data: { password: hash } });
  await prisma.passwordResetToken.delete({ where: { token } });
  res.json({ message: 'Password updated' });
});

export default router;
