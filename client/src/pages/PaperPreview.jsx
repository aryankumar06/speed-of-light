import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import QuestionEditor from '../components/QuestionEditor';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function PaperPreview() {
  const { state } = useLocation();
  const [questions, setQuestions] = useState(state?.generated?.questions || []);
  const [active, setActive] = useState(0);
  const counts = [{ name:'easy', value: questions.filter(q=>q.difficulty==='easy').length },{ name:'medium', value: questions.filter(q=>q.difficulty==='medium').length },{ name:'hard', value: questions.filter(q=>q.difficulty==='hard').length }];
  return <div className="md:flex"><Sidebar /><main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 grid lg:grid-cols-2 gap-4">
    <div className="card p-4 hidden md:block"><h2 className="font-heading text-xl">Print Preview</h2><div className="mt-3 space-y-2">{questions.map((q,i)=><div key={q.id}><b>Q{i+1}:</b> {q.text}</div>)}</div></div>
    <div className="space-y-3"><div className="card p-4"><div className="grid grid-cols-3 text-sm"><div>Total: {questions.length}</div><div>Marks: {questions.reduce((a,b)=>a+(b.marks||0),0)}</div><div className="h-24"><ResponsiveContainer><PieChart><Pie data={counts} dataKey="value">{['#10B981','#0F1C3F','#64748B'].map(c=><Cell key={c} fill={c}/> )}</Pie></PieChart></ResponsiveContainer></div></div></div>
      <div className="space-y-2 max-h-[55vh] overflow-auto">{questions.map((q,i)=><button key={q.id} className="card p-3 w-full text-left" onClick={()=>setActive(i)}>{q.text.slice(0,90)}...</button>)}</div>
      {questions[active] && <QuestionEditor question={questions[active]} onChange={(updated)=>setQuestions(questions.map((q,i)=>i===active?updated:q))} />}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2"><button className="btn-primary">Download PDF</button><button className="btn-ghost">Download Answer Key</button><button className="btn-ghost">Save to Bank</button><button className="btn-ghost">Share Link</button></div>
    </div>
  </main></div>;
}
