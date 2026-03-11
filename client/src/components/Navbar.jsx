import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white/90 backdrop-blur border-b z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-heading text-2xl text-navy">PaperMint</Link>
        <div className="flex gap-2">
          <Link className="btn-ghost" to="/login">Login</Link>
          <Link className="btn-primary" to="/register">Start Free</Link>
        </div>
      </div>
    </nav>
  );
}
