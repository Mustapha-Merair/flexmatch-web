'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, getToken, getUser, logout, TRUST_COLORS } from '@/lib/api';

export default function ProDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [missions, setMissions] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = getUser();
    const t = getToken();
    if (!u || !t) { router.push('/login'); return; }
    if (u.type !== 'PRO') { router.push('/client/dashboard'); return; }
    setUser(u);
    Promise.all([api.getMissions(), api.getMyApplications(t)]).then(([m, a]) => {
      setMissions(Array.isArray(m) ? m.slice(0, 6) : []);
      setApplications(Array.isArray(a) ? a : []);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const initials = user ? (user.firstName[0] + (user.lastName || 'U')[0]).toUpperCase() : '?';
  const trustColor = TRUST_COLORS[user?.trustLevel] || '#cd7f32';

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-black"><span className="text-cyan-500">Flex</span><span className="text-gray-900">Match</span></div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{background: trustColor}}>{user?.trustLevel}</span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">{initials}</div>
            <button onClick={() => { logout(); router.push('/login'); }} className="text-sm text-red-500">Deconnexion</button>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 text-white mb-8" style={{background: 'linear-gradient(135deg, #001f3f, #0d2d50)'}}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm mb-1">Tableau de bord Pro</p>
              <h1 className="text-3xl font-black mb-2">{user?.firstName} {user?.lastName}</h1>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-sm font-bold text-white" style={{background: trustColor}}>{user?.trustLevel}</span>
                <span className="text-gray-400 text-sm">TrustScore : <strong className="text-white">{user?.trustScore}</strong></span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-cyan-400">{applications.filter((a: any) => a.status === 'accepted').length}</div>
              <div className="text-gray-400 text-sm">Missions acceptees</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Candidatures', value: applications.length },
            { label: 'Acceptees', value: applications.filter((a: any) => a.status === 'accepted').length },
            { label: 'TrustScore', value: user?.trustScore },
            { label: 'Niveau', value: user?.trustLevel },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-black text-cyan-600">{s.value}</div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-black mb-4">Missions disponibles ({missions.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {missions.map((m: any) => (
              <div key={m.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600">
                  <div className="text-xs text-white/80 mb-1">{m.sector} · {m.city}</div>
                  <div className="text-lg font-black text-white">{m.title}</div>
                </div>
                <div className="p-4">
                  <p className="text-gray-500 text-sm mb-3">{(m.description || '').substring(0, 80)}...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-cyan-600">{m.price} EUR</span>
                    <button onClick={async () => {
                      const t = getToken();
                      const data = await api.applyMission(t, m.id);
                      alert(data.id || data.missionId ? 'Candidature envoyee' : data.message || 'Erreur');
                    }} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl text-sm">
                      Postuler
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
