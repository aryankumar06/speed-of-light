export default function PaperCard({ paper }) {
  return <div className="card p-4">
    <div className="font-semibold">{paper.title}</div>
    <div className="text-sm text-slate-500">{paper.subject} • {paper.totalMarks} marks</div>
    <div className="text-xs text-slate-400 mt-2">{new Date(paper.createdAt || Date.now()).toLocaleDateString()}</div>
  </div>;
}
