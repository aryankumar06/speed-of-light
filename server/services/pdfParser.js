import fs from 'fs/promises';
import pdfParse from 'pdf-parse';

export async function parsePdf(filePath) {
  const buffer = await fs.readFile(filePath);
  const parsed = await pdfParse(buffer);
  return { extractedText: parsed.text || '', pageCount: parsed.numpages || 0 };
}
