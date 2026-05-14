'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, getToken, getUser, logout, SECTORS } from '@/lib/api';

export default function ClientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = getUser();
    const t = getToken();
    if (!u || !t) { router.push('/login'); return; }
    setUser(u);
    api.getMissions().then(data => {
      setMissions(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const initials = user ? (user.firstName[0] + (user.lastName || 'U')[0]).toUpperCase() : '?';

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-black"><span className="text-cyan-500">Flex</span><span className="text-gray-900">Match</span></div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-cyan-100 text-cyan-700 font-bold px-2 py-1 rounded-full">{user?.publicId}</span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">{initials}</div>
            <button onClick={() => { logout(); router.push('/login'); }} className="text-sm text-red-500">Deconnexion</button>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-6 text-white mb-8">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-cyan-100 text-sm mb-1">Bonjour</p>
              <h1 className="text-3xl font-black mb-2">{user?.firstName} {user?.lastName}</h1>
              <div className="flex items-center gap-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{user?.publicId}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Score : {user?.trustScore}</span>
              </div>
            </div>
            <button onClick={() => router.push('/client/missions/create')}
              className="bg-white text-cyan-600 font-bold px-4 py-2 rounded-xl text-sm">
              + Mission
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total missions', value: missions.length, icon: 'M' },
            { label: 'En cours', value: missions.filter((m: any) => m.status === 'IN_PROGRESS').length, icon: 'R' },
            { label: 'Terminees', value: missions.filter((m: any) => m.status === 'COMPLETED').length, icon: 'V' },
            { label: 'Cashback', value: '0 EUR', icon: 'C' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-black text-cyan-600">{s.value}</div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-black mb-4">Poster une mission</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {SECTORS.map(s => (
              <button key={s.name} onClick={() => router.push('/client/missions/create?sector=' + s.name)}
                className="bg-white rounded-2xl p-3 text-center hover:shadow-md border-2 border-transparent hover:border-cyan-300 transition-all">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xs font-bold text-gray-700">{s.name}</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-black mb-4">Missions ({missions.length})</h2>
          {missions.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <p className="text-gray-500 mb-4">Aucune mission</p>
              <button onClick={() => router.push('/client/missions/create')}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl">
                Poster une mission
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {missions.slice(0, 4).map((m: any) => (
                <div key={m.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600">
                    <div className="text-xs text-white/80 mb-1">{m.sector} · {m.city}</div>
                    <div className="text-lg font-black text-white">{m.title}</div>
                    <div className="text-xs text-white/70 mt-1">Code : {m.code}</div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <span className="text-2xl font-black text-cyan-600">{m.price} EUR</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
