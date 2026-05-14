'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api, getToken, getUser, SECTORS } from '@/lib/api';

function CreateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [sector, setSector] = useState(searchParams.get('sector') || 'Restauration');
  const [jobs, setJobs] = useState<string[]>([]);
  const [form, setForm] = useState({ title: '', description: '', address: '', city: 'Paris', price: 100 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push('/login'); return; }
    setUser(u);
  }, []);

  const handlePost = async () => {
    setLoading(true);
    const token = getToken();
    const data = await api.createMission(token, { ...form, sector, subSector: jobs.join(', ') });
    if (data.id) {
      router.push('/client/dashboard');
    } else {
      setError(data.message || 'Erreur');
    }
    setLoading(false);
  };

  const currentSector = SECTORS.find(s => s.name === sector);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => router.back()} className="text-cyan-500 font-semibold text-lg">Retour</button>
          <div className="text-xl font-black">Creer une mission</div>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-500 text-xs uppercase tracking-wide mb-3">Secteur</h3>
          <div className="grid grid-cols-4 gap-2">
            {SECTORS.map(s => (
              <button key={s.name} onClick={() => { setSector(s.name); setJobs([]); }}
                className={"p-2 rounded-xl border-2 text-center transition-all " + (sector === s.name ? 'border-cyan-500 bg-cyan-50' : 'border-gray-100')}>
                <div className="text-xl">{s.icon}</div>
                <div className="text-xs font-semibold mt-1">{s.name}</div>
              </button>
            ))}
          </div>
        </div>
        {currentSector && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-500 text-xs uppercase mb-3">Competence</h3>
            <div className="flex flex-wrap gap-2">
              {currentSector.jobs.map(j => (
                <button key={j} onClick={() => setJobs(prev => prev.includes(j) ? prev.filter(x => x !== j) : [...prev, j])}
                  className={"px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-all " + (jobs.includes(j) ? 'bg-cyan-500 text-white border-cyan-500' : 'border-gray-200 text-gray-600')}>
                  {j}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <input className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-cyan-400 outline-none"
            placeholder="Titre de la mission" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <textarea className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-cyan-400 outline-none resize-none h-24"
            placeholder="Description..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          <input className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-cyan-400 outline-none"
            placeholder="Adresse" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <select className="px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-cyan-400 outline-none"
              value={form.city} onChange={e => setForm({...form, city: e.target.value})}>
              <option>Paris</option><option>Lyon</option><option>Marseille</option><option>Bordeaux</option>
            </select>
            <input type="number" className="px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-cyan-400 outline-none"
              placeholder="Budget" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} />
          </div>
        </div>
        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl">{error}</div>}
        <button onClick={handlePost} disabled={loading || !form.title || !form.description}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black rounded-2xl text-lg disabled:opacity-50">
          {loading ? 'Publication...' : 'Publier la mission'}
        </button>
      </div>
    </main>
  );
}

export default function CreateMission() {
  return <Suspense><CreateForm /></Suspense>;
}
