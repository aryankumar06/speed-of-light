import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const submit = async (e) => { e.preventDefault(); await api.post('/auth/register', form); navigate('/login'); };
  return <div className="min-h-screen grid place-items-center p-4"><form onSubmit={submit} className="card p-6 w-full max-w-md space-y-3"><h1 className="font-heading text-3xl text-navy">Create account</h1>{['name','email','password'].map((k)=><input key={k} className="input" type={k==='password'?'password':'text'} placeholder={k} value={form[k]} onChange={(e)=>setForm({...form,[k]:e.target.value})} />)}<button className="btn-primary w-full">Register</button></form></div>;
}
