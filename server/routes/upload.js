import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { parsePdf } from '../services/pdfParser.js';

const router = express.Router();
await fs.mkdir(path.resolve('uploads'), { recursive: true });

const upload = multer({
  dest: 'uploads/',
  fileFilter: (_, file, cb) => {
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];
    if (!allowed.includes(file.mimetype)) return cb(new Error('Please upload PDF, Word, or image files only'));
    cb(null, true);
  }
});

router.post('/pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    if (req.file.mimetype !== 'application/pdf') return res.json({ extractedText: '', pageCount: 0, message: 'OCR processing for non-PDF files in progress.' });
    const data = await parsePdf(req.file.path);
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: 'PDF upload failed', retry: true, error: e.message });
  }
});

export default router;
