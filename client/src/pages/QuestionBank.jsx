import Sidebar from '../components/Sidebar';

export default function QuestionBank() {
  return <div className="md:flex"><Sidebar /><main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 space-y-4">
    <h1 className="font-heading text-3xl text-navy">Question Bank</h1>
    <div className="grid md:grid-cols-5 gap-2">{['Subject','Topic','Type','Difficulty','Board'].map(f=><select key={f} className="input"><option>{f}</option></select>)}</div>
    <input className="input" placeholder="Search questions" />
    <div className="grid md:grid-cols-3 gap-3">{Array.from({length:9}).map((_,i)=><div key={i} className="card p-4"><p className="line-clamp-3">Sample question text {i+1}</p><div className="text-xs mt-2">MCQ • Medium • 1 mark • Algebra • Used 5x</div></div>)}</div>
    <div className="flex gap-2"><button className="btn-primary">Create paper from selected</button><button className="btn-ghost">Bulk delete</button></div>
  </main></div>;
}
