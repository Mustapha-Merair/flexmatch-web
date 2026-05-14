'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateMission() {
  const router = useRouter();
  const [user, setUser] = useState<{id: string} | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    sector: 'BTP',
    city: 'Paris',
    price: 100,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const u = localStorage.getItem('user');
    const t = localStorage.getItem('token');
    if (!u || !t) { router.push('/login'); return; }
    setUser(JSON.parse(u));
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://flexmatch-api-production.up.railway.app/missions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, clientId: user?.id })
      });
      const data = await res.json();
      if (data.id) {
        router.push('/dashboard');
      } else {
        setError('Erreur creation mission');
      }
    } catch (e) {
      setError('Erreur de connexion');
    }
    setLoading(false);
  };

  const sectors = [
    { icon: 'X', name: 'BTP' },
    { icon: 'X', name: 'Logistique' },
    { icon: 'X', name: 'Restauration' },
    { icon: 'X', name: 'Nettoyage' },
    { icon: 'X', name: 'Baby-sitting' },
    { icon: 'X', name: 'Demenagement' },
    { icon: 'X', name: 'Evenementiel' },
    { icon: 'X', name: 'IT Tech' },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-cyan-500">Flex</span>
            <span className="text-gray-900">Match</span>
          </div>
          <a href="/dashboard" className="text-cyan-500">Retour</a>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Poster une mission</h1>
        <div className="bg-white rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2">Secteur</label>
            <div className="grid grid-cols-2 gap-2">
              {sectors.map((s) => (
                <button key={s.name}
                  onClick={() => setForm({ ...form, sector: s.name })}
                  className={"p-3 rounded-xl border-2 text-left " + (form.sector === s.name ? "border-cyan-500 bg-cyan-50" : "border-gray-200")}>
                  <span className="font-semibold">{s.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Titre</label>
            <input className="w-full border rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
              placeholder="Ex: Plombier qualifie"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea className="w-full border rounded-xl px-4 py-3 outline-none h-28 resize-none"
              placeholder="Decris le travail..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Ville</label>
              <select className="w-full border rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}>
                <option>Paris</option>
                <option>Lyon</option>
                <option>Marseille</option>
                <option>Bordeaux</option>
                <option>Lille</option>
                <option>Nantes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Tarif</label>
              <input className="w-full border rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
            </div>
          </div>
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}
          <button onClick={handleSubmit}
            disabled={loading || !form.title || !form.description}
            className="w-full py-4 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600 disabled:opacity-50">
            {loading ? 'Publication...' : 'Publier la mission'}
          </button>
        </div>
      </div>
    </main>
  );
}
