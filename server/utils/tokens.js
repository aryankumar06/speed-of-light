import jwt from 'jsonwebtoken';

export const signAccessToken = (user) => jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
export const signRefreshToken = (user) => jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, { expiresIn: '7d' });
