import Sidebar from '../components/Sidebar';

export default function Settings() {
  return <div className="md:flex"><Sidebar /><main className="flex-1 p-4 md:p-8 pb-24 md:pb-8"><h1 className="font-heading text-3xl text-navy mb-4">Settings</h1><div className="card p-4 space-y-3 max-w-2xl">
    <input className="input" placeholder="Institute name" />
    <input className="input" type="file" accept="image/*" />
    <select className="input"><option>Default board</option><option>CBSE</option></select>
    <select className="input"><option>Default class</option><option>10th</option></select>
    <select className="input"><option>Language preference</option><option>English</option><option>Hindi</option></select>
    <label className="flex items-center gap-2"><input type="checkbox" /> Email notifications</label>
    <a className="btn-ghost inline-block" href="#">Manage subscription (Razorpay)</a>
    <button className="btn-primary">Export all papers as ZIP</button>
  </div></main></div>;
}
