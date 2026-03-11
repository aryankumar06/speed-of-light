import { NavLink } from 'react-router-dom';
const items = [['/dashboard', 'Dashboard'], ['/create', 'Create'], ['/question-bank', 'Question Bank'], ['/past-papers', 'Past Papers'], ['/settings', 'Settings']];

export default function Sidebar() {
  return <aside className="md:w-56 w-full md:min-h-screen bg-white border-r p-3 md:p-4 fixed md:static bottom-0 left-0 right-0 z-20">
    <div className="hidden md:block font-heading text-xl text-navy mb-4">PaperMint</div>
    <div className="flex md:flex-col gap-2 overflow-x-auto">{items.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => `px-3 py-2 rounded-lg whitespace-nowrap ${isActive ? 'bg-navy text-white' : 'hover:bg-slate-100'}`}>{label}</NavLink>)}</div>
  </aside>;
}
