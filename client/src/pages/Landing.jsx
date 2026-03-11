import Navbar from '../components/Navbar';

export default function Landing() {
  return <div>
    <Navbar />
    <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
      <div><h1 className="font-heading text-5xl text-navy mb-4">Generate exam papers in 2 minutes</h1><p className="text-lg">PaperMint helps Indian educators upload notes, configure blueprint, and instantly download polished board-aligned papers.</p><button className="btn-primary mt-6">Start Free — No Credit Card Needed</button></div>
      <div className="card h-64 grid place-items-center">Screen recording placeholder</div>
    </section>
    <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-4">{['AI from your content','Board-aligned patterns','Answer key + marking scheme','Question bank','Multiple variants','Institute branding'].map(f=><div key={f} className="card p-4">{f}</div>)}</section>
    <section className="max-w-6xl mx-auto px-4 py-12"><h2 className="font-heading text-3xl text-navy mb-4">How it works</h2><div className="grid md:grid-cols-3 gap-3">{['Upload','Configure','Download'].map(s=><div key={s} className="card p-5 text-center">{s}</div>)}</div></section>
    <section className="max-w-6xl mx-auto px-4 py-12"><h2 className="font-heading text-3xl text-navy mb-4">Pricing</h2><div className="grid md:grid-cols-3 gap-3">{['Free','Teacher Pro ₹499','Institute ₹2,999'].map(p=><div key={p} className="card p-4">{p}</div>)}</div></section>
    <section className="max-w-6xl mx-auto px-4 py-12"><h2 className="font-heading text-3xl text-navy mb-4">Testimonials</h2><div className="grid md:grid-cols-3 gap-3">{['Saved 6 hours/week — Physics teacher, Pune','Our mock tests look premium now — Coaching owner, Kota','Students love balanced papers — Biology teacher, Bengaluru'].map(t=><div key={t} className="card p-4">“{t}”</div>)}</div></section>
    <section className="max-w-6xl mx-auto px-4 py-12"><h2 className="font-heading text-3xl text-navy mb-4">FAQs</h2><div className="grid md:grid-cols-2 gap-3">{Array.from({length:8}).map((_,i)=><div key={i} className="card p-4">FAQ {i+1}</div>)}</div></section>
  </div>;
}
