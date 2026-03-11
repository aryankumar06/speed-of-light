import Sidebar from '../components/Sidebar';
import PaperCard from '../components/PaperCard';

export default function PastPapers() {
  return <div className="md:flex"><Sidebar /><main className="flex-1 p-4 md:p-8 pb-24 md:pb-8"><h1 className="font-heading text-3xl text-navy mb-4">Past Papers</h1><div className="grid md:grid-cols-3 gap-3">{Array.from({length:6}).map((_,i)=><PaperCard key={i} paper={{ title:`Previous ${i+1}`, subject:'Math', totalMarks:100, createdAt:Date.now()-i*5000000 }} />)}</div></main></div>;
}
