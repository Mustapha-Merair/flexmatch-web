'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://flexmatch-api-production.up.railway.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch {
      setError('Erreur de connexion au serveur');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold mb-2">
            <span className="text-cyan-500">Flex</span>
            <span className="text-gray-900">Match</span>
          </div>
          <p className="text-gray-500">Connexion a ton compte</p>
        </div>

        <div className="space-y-4">
          <input
            className="w-full border rounded-lg px-3 py-3 outline-none focus:border-cyan-500"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full border rounded-lg px-3 py-3 outline-none focus:border-cyan-500"
            placeholder="Mot de passe"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 py-3 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600 transition disabled:opacity-50"
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Pas encore de compte ?{' '}
          <a href="/signup" className="text-cyan-500 font-semibold">S'inscrire</a>
        </p>
      </div>
    </main>
  );
}
