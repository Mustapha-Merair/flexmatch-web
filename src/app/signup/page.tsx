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
      const res = await fetch('https://flexmatch-api-production.up.railway.app/auth/signup', {
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
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <a href="/" className="text-3xl font-black">
            <span className="text-cyan-500">Flex</span>
            <span className="text-gray-900">Match</span>
          </a>
          <p className="text-gray-500 mt-2">Cree ton compte gratuitement</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 p-8 border border-gray-100">
          <h1 className="text-2xl font-black text-gray-900 mb-2">Inscription</h1>
          <p className="text-gray-400 text-sm mb-6">Tu es :</p>

          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setForm({ ...form, type: 'CLIENT' })}
              className={"flex-1 py-3 rounded-xl font-bold text-sm transition-all " + (form.type === 'CLIENT' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-200' : 'bg-gray-50 text-gray-600 border-2 border-gray-100')}
            >
              👤 Client
            </button>
            <button
              onClick={() => setForm({ ...form, type: 'PRO' })}
              className={"flex-1 py-3 rounded-xl font-bold text-sm transition-all " + (form.type === 'PRO' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-200' : 'bg-gray-50 text-gray-600 border-2 border-gray-100')}
            >
              💼 Prestataire
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Prenom</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-400 text-sm bg-gray-50"
                  placeholder="Mustapha"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nom</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-400 text-sm bg-gray-50"
                  placeholder="Merair"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-400 text-sm bg-gray-50"
                placeholder="ton@email.com"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Mot de passe</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-400 text-sm bg-gray-50"
                placeholder="••••••••"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Ville</label>
              <select
                className="w-full border-2 border-gray-100 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-400 text-sm bg-gray-50"
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
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !form.firstName || !form.email || !form.password}
            className="w-full mt-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-200 transition-all disabled:opacity-50"
          >
            {loading ? 'Creation...' : 'Creer mon compte'}
          </button>

          <div className="mt-4 text-center text-xs text-gray-400">
            En continuant, tu acceptes les CGU de FlexMatch
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            Deja un compte ?{' '}
            <a href="/login" className="text-cyan-500 font-bold hover:underline">
              Se connecter
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
