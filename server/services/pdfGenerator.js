import fs from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';

function htmlTemplate(paper, instituteName = 'PaperMint Institute', instituteLogo) {
  const qs = paper.questions || [];
  const options = (q) => (q.options || []).map(o => `<div>${o.label}. ${o.text}</div>`).join('');
  return `<!doctype html><html><head><style>
  body{font-family:Helvetica,Arial,sans-serif;padding:2.5cm;color:#111}
  .header{display:flex;align-items:center;gap:16px;border-bottom:1px solid #ddd;padding-bottom:10px}
  .logo{width:48px;height:48px;object-fit:contain}
  h1,h2{margin:0}
  .meta{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:14px 0}
  .q{margin:10px 0}
  .options{column-count:2}
  .footer{position:fixed;bottom:1cm;left:2.5cm;right:2.5cm;text-align:center;font-size:12px;color:#777}
  .page{page-break-after:always}
  </style></head><body>
  <div class='header'>${instituteLogo ? `<img class='logo' src='${instituteLogo}'/>` : ''}<h1>${instituteName}</h1></div>
  <h2>${paper.title}</h2>
  <div class='meta'><div>Subject: ${paper.subject}</div><div>Class: ${paper.className}</div><div>Duration: ${paper.duration} mins</div><div>Total Marks: ${paper.totalMarks}</div></div>
  <p><strong>Name:</strong> ____________ <strong>Roll No:</strong> ____________</p>
  <h3>General Instructions</h3><ul><li>Read all questions carefully.</li><li>All questions are compulsory unless stated.</li><li>Write neat and legible answers.</li></ul>
  ${qs.map((q,i)=>`<div class='q'><strong>Q${i+1} (${q.marks} marks):</strong> ${q.text}<div class='options'>${q.type==='mcq'?options(q):''}</div></div>`).join('')}
  <div class='page'></div><h2>Answer Key & Marking Scheme</h2>
  ${qs.map((q,i)=>`<div><strong>Q${i+1}:</strong> ${q.answer}<br/><em>${q.markingScheme || ''}</em></div>`).join('')}
  <div class='footer'>PaperMint • Page <span class='pageNumber'></span></div></body></html>`;
}

export async function generatePdf(paper, { instituteName, instituteLogo } = {}) {
  await fs.mkdir(path.resolve('pdfs'), { recursive: true });
  const out = path.resolve('pdfs', `${paper.id || Date.now()}.pdf`);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(htmlTemplate(paper, instituteName, instituteLogo), { waitUntil: 'networkidle0' });
  await page.pdf({ path: out, format: 'A4', margin: { top: '2.5cm', right: '2.5cm', bottom: '2.5cm', left: '2.5cm' } });
  await browser.close();
  return out;
}
