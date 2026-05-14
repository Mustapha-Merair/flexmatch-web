'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, setAuth } from '@/lib/api';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const data = await api.login(form);
    if (data.token) {
      setAuth(data.token, data.user);
      router.push(data.user.type === 'PRO' ? '/pro/dashboard' : '/client/dashboard');
    } else {
      setError(data.message || 'Erreur connexion');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black"><span className="text-cyan-500">Flex</span><span className="text-gray-900">Match</span></h1>
          <p className="text-gray-500 mt-2">La connexion agile</p>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-black mb-6">Connexion</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email</label>
              <input className="w-full mt-1 px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-cyan-400 outline-none bg-gray-50"
                type="email" placeholder="ton@email.com" value={form.email}
                onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Mot de passe</label>
              <input className="w-full mt-1 px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-cyan-400 outline-none bg-gray-50"
                type="password" placeholder="••••••••" value={form.password}
                onChange={e => setForm({...form, password: e.target.value})} />
            </div>
          </div>
          {error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}
          <button onClick={handleLogin} disabled={loading}
            className="w-full mt-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl disabled:opacity-50 hover:shadow-lg transition-all">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
          <p className="mt-4 text-center text-sm text-gray-500">
            Pas de compte ? <a href="/signup" className="text-cyan-500 font-bold">S inscrire</a>
          </p>
        </div>
      </div>
    </main>
  );
}
