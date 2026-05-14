'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User { id: string; firstName: string; lastName: string; type: string; }
interface Mission { id: string; title: string; description: string; sector: string; city: string; price: number; }

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    const u = localStorage.getItem('user');
    const t = localStorage.getItem('token');
    if (!u || !t) { router.push('/login'); return; }
    setUser(JSON.parse(u));
    fetch('https://flexmatch-api-production.up.railway.app/missions')
      .then(r => r.json())
      .then(setMissions)
      .catch(console.error);
  }, []);

  if (!user) return <div className='min-h-screen flex items-center justify-center'><div className='text-cyan-500'>Chargement...</div></div>;

  return (
    <main className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm'>
        <div className='max-w-6xl mx-auto px-4 py-4 flex justify-between items-center'>
          <div className='text-2xl font-bold'>
            <span className='text-cyan-500'>Flex</span>
            <span className='text-gray-900'>Match</span>
          </div>
          <div className='flex items-center gap-4'>
            <span className='text-gray-600'>Bonjour {user.firstName}</span>
            <button onClick={() => { localStorage.clear(); router.push('/'); }} className='text-sm text-red-500'>
              Deconnexion
            </button>
          </div>
        </div>
      </header>
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='bg-gradient-to-r from-cyan-500 to-cyan-700 rounded-2xl p-6 text-white mb-8'>
          <h1 className='text-2xl font-bold'>Bonjour {user.firstName}</h1>
          <p className='opacity-90'>Bienvenue sur FlexMatch</p>
        </div>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold text-gray-900'>Missions ({missions.length})</h2>
          {user.type === 'CLIENT' && (
            <a href='/missions/create' className='px-4 py-2 bg-cyan-500 text-white rounded-lg'>
              Poster une mission
            </a>
          )}
        </div>
        {missions.length === 0 ? (
          <div className='text-center py-12 text-gray-500'>
            <p>Aucune mission disponible</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {missions.map((m) => (
              <div key={m.id} className='bg-white rounded-xl shadow-sm border overflow-hidden'>
                <div className='bg-gradient-to-r from-cyan-500 to-cyan-700 p-4'>
                  <div className='text-xs text-white/80 mb-1'>{m.sector} · {m.city}</div>
                  <div className='text-lg font-bold text-white'>{m.title}</div>
                </div>
                <div className='p-4'>
                  <p className='text-gray-600 text-sm mb-3'>{m.description}</p>
                  <div className='flex justify-between items-center'>
                    <span className='text-2xl font-bold text-cyan-600'>{m.price} euros</span>
                    <button className='px-3 py-1 bg-cyan-500 text-white text-sm rounded-lg'>Voir</button>
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