import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PaperCard from '../components/PaperCard';

export default function Dashboard() {
  const papers = Array.from({ length: 6 }).map((_, i) => ({ title: `Paper ${i + 1}`, subject: 'Physics', totalMarks: 80, createdAt: Date.now() - i * 86400000 }));
  return <div className="md:flex"><Sidebar /><main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
    <h1 className="font-heading text-3xl text-navy">Welcome back, Teacher</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">{['Papers this month: 3','Questions in bank: 218','Time saved: 11h','Papers remaining: 2'].map(s => <div key={s} className="card p-4">{s}</div>)}</div>
    <div className="text-center mb-6"><Link className="btn-primary text-lg px-8 py-3" to="/create">➕ Create New Paper</Link></div>
    <div className="h-3 rounded-full bg-slate-200 overflow-hidden mb-6"><div className="h-full bg-emerald" style={{ width: '60%' }} /></div>
    <div className="grid md:grid-cols-3 gap-3">{papers.map(p => <PaperCard key={p.title} paper={p} />)}</div>
  </main></div>;
}
