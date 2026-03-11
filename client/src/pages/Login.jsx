import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      dispatch({ type: 'LOGIN', payload: { user: data.user, accessToken: data.accessToken } });
      navigate('/dashboard');
    } catch (err) { setError(err.response?.data?.message || 'Login failed'); }
  };
  return <div className="min-h-screen grid place-items-center p-4"><form className="card p-6 w-full max-w-md space-y-3" onSubmit={submit}><h1 className="font-heading text-3xl text-navy">Login</h1><input className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/><input className="input" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>{error && <p className="text-red-500 text-sm">{error}</p>}<button className="btn-primary w-full">Login</button><button type="button" className="btn-ghost w-full">Sign in with Google</button><p className="text-sm">No account? <Link to="/register" className="text-emerald-600">Register</Link></p></form></div>;
}
