import Anthropic from '@anthropic-ai/sdk';

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) : null;

const systemPrompt = `You are an expert Indian school exam paper creator with deep knowledge of CBSE, ICSE, and state board examination patterns. You create high-quality, pedagogically sound exam questions from provided educational content.
RULES:
1. Generate questions ONLY from the provided content — do not add outside knowledge
2. Follow Indian board examination formats strictly
3. Ensure questions are unambiguous and clear
4. For MCQs: provide 4 options (A, B, C, D) with exactly one correct answer
5. Match Bloom's taxonomy levels to difficulty
6. Ensure questions test different aspects — avoid repetition
7. For case-based: provide a 150-200 word passage then 4 questions from it
8. Return ONLY valid JSON, no explanations outside JSON`;

const buildFallback = (config) => {
  const types = Object.entries(config.questionTypes || {}).flatMap(([type, count]) => Array.from({ length: count }, () => type));
  const questions = types.map((type, idx) => ({
    id: `q${idx + 1}`,
    type: type === 'caseBased' ? 'case_based' : type,
    text: `${config.subject} ${type} question ${idx + 1} based on provided notes.`,
    marks: type === 'long' ? 5 : type === 'short' ? 3 : 1,
    difficulty: idx % 3 === 0 ? 'easy' : idx % 3 === 1 ? 'medium' : 'hard',
    topic: (config.topics?.[0] || 'General'),
    bloomsLevel: idx % 3 === 0 ? 'remember' : idx % 3 === 1 ? 'apply' : 'evaluate',
    options: type === 'mcq' ? [{ label: 'A', text: 'Option A' }, { label: 'B', text: 'Option B' }, { label: 'C', text: 'Option C' }, { label: 'D', text: 'Option D' }] : undefined,
    answer: 'Model answer',
    markingScheme: 'Award marks for key points.'
  }));

  return {
    paperTitle: config.paperTitle || `${config.subject} Practice Paper`,
    questions,
    sectionBreakdown: {
      sectionA: { type: 'mcq', questions: questions.filter(q => q.type === 'mcq').map(q => q.id), marksEach: 1 },
      sectionB: { type: 'short', questions: questions.filter(q => q.type === 'short').map(q => q.id), marksEach: 3 },
      sectionC: { type: 'long', questions: questions.filter(q => q.type === 'long').map(q => q.id), marksEach: 5 }
    }
  };
};

export async function generateExamPaper(config) {
  if (!client) return buildFallback(config);

  const userPrompt = `Generate exam JSON using:\n${JSON.stringify(config, null, 2)}`;
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3500,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }]
  });

  const text = response.content.find((c) => c.type === 'text')?.text || '{}';
  const parsed = JSON.parse(text);

  const expectedCount = Object.values(config.questionTypes || {}).reduce((a, b) => a + Number(b || 0), 0);
  if (!Array.isArray(parsed.questions) || parsed.questions.length !== expectedCount) {
    throw new Error('AI generated incorrect question count. Please retry.');
  }
  return parsed;
}
