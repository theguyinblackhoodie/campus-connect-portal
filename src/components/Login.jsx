import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

export default function Login() {
  const { login } = useData();
  const navigate = useNavigate();
  const [id, setId] = useState('STU01');
  const [pass, setPass] = useState('student-1');

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(id, pass);
    if (res.success) navigate('/dashboard'); else alert(res.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border-t-4 border-blue-900">
        <h1 className="text-2xl font-bold text-blue-900 text-center mb-6">Campus Connect</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative"><User className="absolute left-2 top-2 text-gray-400" size={20}/><input value={id} onChange={e=>setId(e.target.value)} className="w-full pl-10 p-2 border rounded" placeholder="ID (STU01)" /></div>
          <div className="relative"><Lock className="absolute left-2 top-2 text-gray-400" size={20}/><input type="password" value={pass} onChange={e=>setPass(e.target.value)} className="w-full pl-10 p-2 border rounded" placeholder="Pass (student-1)" /></div>
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded font-bold hover:bg-orange-600">Login</button>
        </form>
      </div>
    </div>
  );
}
