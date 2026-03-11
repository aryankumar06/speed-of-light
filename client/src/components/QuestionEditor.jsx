export default function QuestionEditor({ question, onChange }) {
  return <div className="card p-3 space-y-2">
    <textarea className="input" value={question.text} onChange={(e) => onChange({ ...question, text: e.target.value })} />
    <div className="grid grid-cols-2 gap-2">
      <input className="input" value={question.topic} onChange={(e) => onChange({ ...question, topic: e.target.value })} />
      <input className="input" value={question.answer} onChange={(e) => onChange({ ...question, answer: e.target.value })} />
    </div>
  </div>;
}
