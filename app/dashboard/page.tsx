'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [missions, setMissions] = useState<any[]>([]);

  useEffect(() => {
    const u = localStorage.getItem('user');
    const t = localStorage.getItem('token');
    if (!u || !t) { router.push('/login'); return; }
    setUser(JSON.parse(u));
    fetch('http://localhost:3000/missions')
      .then(r => r.json())
      .then(setMissions)
      .catch(console.error);
  }, []);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-cyan-500 text-xl">Chargement...</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-cyan-500">Flex</span>
            <span className="text-gray-900">Match</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Bonjour {user.firstName}</span>
            <span className={"px-3 py-1 rounded-full text-xs font-bold " + (user.type === 'CLIENT' ? 'bg-cyan-100 text-cyan-700' : 'bg-green-100 text-green-700')}>
              {user.type}
            </span>
            <button
              onClick={() => { localStorage.clear(); router.push('/'); }}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Deconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-700 rounded-2xl p-6 text-white mb-8">
          <h1 className="text-2xl font-bold mb-1">Bonjour {user.firstName} !</h1>
          <p className="opacity-90">Bienvenue sur FlexMatch · Trust OS active</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Missions disponibles ({missions.length})
          </h2>
          {user.type === 'CLIENT' && (
            <a href="/missions/create"
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600">
              + Poster une mission
            </a>
          )}
        </div>

        {missions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">📋</div>
            <p>Aucune mission disponible</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {missions.map((m) => (
              <div key={m.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-700 p-4">
                  <div className="text-xs text-white/80 font-semibold mb-1">{m.sector} · {m.city}</div>
                  <div className="text-lg font-bold text-white">{m.title}</div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-3">{m.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-cyan-600">{m.price} €</span>
                    <button className="px-3 py-1 bg-cyan-500 text-white text-sm rounded-lg hover:bg-cyan-600">
                      Voir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
