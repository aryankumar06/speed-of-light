import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import UploadZone from '../components/UploadZone';
import DifficultySlider from '../components/DifficultySlider';
import LoadingScreen from '../components/LoadingScreen';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreatePaper() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [difficulty, setDifficulty] = useState({ easy: 30, medium: 50, hard: 20 });
  const [form, setForm] = useState({ title:'', subject:'Physics', className:'10th', board:'CBSE', totalMarks:80, duration:120, questionTypes:{ mcq:20, short:8, long:4, caseBased:1 }, topics:['Chapter 1'], excludeTopics:[], variants:1, content:'' });
  const navigate = useNavigate();

  const upload = async (file) => {
    const fd = new FormData(); fd.append('file', file);
    const { data } = await api.post('/upload/pdf', fd);
    setFileInfo({ name: file.name, ...data });
    setForm((f) => ({ ...f, content: data.extractedText }));
  };

  const generate = async () => {
    setLoading(true);
    const { data } = await api.post('/generate/paper', { ...form, difficulty });
    setLoading(false);
    navigate('/preview', { state: { generated: data, basics: form, difficulty } });
  };

  return <div className="md:flex"><Sidebar />{loading && <LoadingScreen />}<main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 space-y-4"><div className="h-2 bg-slate-200 rounded-full"><div className="h-full bg-emerald rounded-full" style={{ width: `${step*20}%` }} /></div>
    {step===1 && <div className="card p-4 grid md:grid-cols-2 gap-3">{['title','subject','className','board','totalMarks','duration'].map(k=><input key={k} className="input" placeholder={k} value={form[k]} onChange={(e)=>setForm({...form,[k]:e.target.value})} />)}<button className="btn-primary" onClick={()=>setStep(2)}>Next</button></div>}
    {step===2 && <div className="card p-4 space-y-3"><UploadZone onFile={upload} />{fileInfo && <p className="text-sm">{fileInfo.name} • {fileInfo.pageCount} pages</p>}<textarea className="input" rows="6" placeholder="Type topics or paste notes" value={form.content} onChange={(e)=>setForm({...form,content:e.target.value})}/><button className="btn-primary" onClick={()=>setStep(3)}>Next</button></div>}
    {step===3 && <div className="card p-4 space-y-3"><p>Question configuration</p><DifficultySlider difficulty={difficulty} setDifficulty={setDifficulty} /><button className="btn-primary" onClick={()=>setStep(4)}>Next</button></div>}
    {step===4 && <div className="card p-4"><button className="btn-primary" onClick={generate}>Generate Paper</button></div>}
  </main></div>;
}
