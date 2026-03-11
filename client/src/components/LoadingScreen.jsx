import { useEffect, useState } from 'react';
const steps = ['Reading your content...', 'Generating questions...', 'Checking difficulty balance...', 'Formatting paper...', 'Almost done!'];

export default function LoadingScreen() {
  const [idx, setIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setIdx((i) => (i + 1) % steps.length), 1200); return () => clearInterval(t); }, []);
  return <div className="fixed inset-0 bg-navy/95 text-white grid place-items-center z-50">
    <div className="text-center space-y-4">
      <div className="w-12 h-12 border-4 border-white/20 border-t-emerald rounded-full animate-spin mx-auto" />
      <h3 className="text-2xl font-heading">{steps[idx]}</h3>
      <p>Estimated time: ~45 seconds</p>
      <p className="text-emerald-300">Fun fact: Spaced revision boosts retention by 40%.</p>
    </div>
  </div>;
}
