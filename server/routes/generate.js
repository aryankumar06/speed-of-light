import express from 'express';
import { generateExamPaper } from '../services/claudeService.js';

const router = express.Router();
router.post('/paper', async (req, res) => {
  try {
    const generated = await generateExamPaper(req.body);
    res.json(generated);
  } catch (error) {
    res.status(500).json({ message: error.message.includes('question count') ? 'AI generated wrong question count, retrying recommended.' : 'Generation failed due to timeout/network. Please retry.', retry: true });
  }
});

export default router;
