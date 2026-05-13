'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    type: 'CLIENT',
    city: 'Paris'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3000/auth/signup', {
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
        setError(data.message || 'Erreur inscription');
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
          <p className="text-gray-500">Cree ton compte</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setForm({ ...form, type: 'CLIENT' })}
            className={"flex-1 py-2 rounded-lg font-semibold transition " + (form.type === 'CLIENT' ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-600')}
          >
            Client
          </button>
          <button
            onClick={() => setForm({ ...form, type: 'PRO' })}
            className={"flex-1 py-2 rounded-lg font-semibold transition " + (form.type === 'PRO' ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-600')}
          >
            Prestataire
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              className="border rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-500"
              placeholder="Prenom"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <input
              className="border rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-500"
              placeholder="Nom"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-500"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-500"
            placeholder="Mot de passe"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <select
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-500"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          >
            <option>Paris</option>
            <option>Lyon</option>
            <option>Marseille</option>
            <option>Toulouse</option>
            <option>Bordeaux</option>
            <option>Lille</option>
            <option>Nice</option>
            <option>Nantes</option>
          </select>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 py-3 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600 transition disabled:opacity-50"
        >
          {loading ? 'Creation...' : 'Creer mon compte'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Deja un compte ?{' '}
          <a href="/login" className="text-cyan-500 font-semibold">Se connecter</a>
        </p>
      </div>
    </main>
  );
}
