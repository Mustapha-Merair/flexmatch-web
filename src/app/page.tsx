import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-black"><span className="text-cyan-500">Flex</span><span className="text-gray-900">Match</span></div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 font-semibold text-sm hover:text-cyan-500">Connexion</Link>
            <Link href="/(auth)/signup" className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full text-sm hover:shadow-lg transition-all">
              Commencer
            </Link>
          </div>
        </div>
      </header>

      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span>🇫🇷</span> Disponible partout en France
          </div>
          <h1 className="text-6xl font-black text-gray-900 mb-6 leading-tight">
            La plateforme de<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">prestation agile</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            Connectez-vous avec les meilleurs prestataires verifies en 30 minutes.
            Restauration, Logistique, BTP, IT et plus encore.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/(auth)/signup?type=CLIENT"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl text-lg hover:shadow-xl transition-all">
              Je cherche un pro →
            </Link>
            <Link href="/(auth)/signup?type=PRO"
              className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl border-2 border-gray-200 hover:border-cyan-300 text-lg transition-all">
              Je suis prestataire →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-cyan-500 to-blue-600">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[['14 200', 'Pros verifies'],['98%', 'Satisfaction'],['30 min', 'Temps moyen'],['8', 'Secteurs']].map(([v,l]) => (
            <div key={l}><div className="text-4xl font-black mb-1">{v}</div><div className="text-cyan-100 text-sm">{l}</div></div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">8 secteurs disponibles</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: 'X', name: 'Restauration', desc: '2 240 pros' },
              { icon: 'X', name: 'Logistique', desc: '3 120 pros' },
              { icon: 'X', name: 'Nettoyage', desc: '1 240 pros' },
              { icon: 'X', name: 'Evenementiel', desc: '1 480 pros' },
              { icon: 'X', name: 'Domicile', desc: '980 pros' },
              { icon: 'X', name: 'Artisanat', desc: '3 680 pros' },
              { icon: 'X', name: 'IT Tech', desc: '340 pros' },
              { icon: 'X', name: 'Automobile', desc: '760 pros' },
            ].map(s => (
              <Link key={s.name} href={"/(auth)/signup"}
                className="bg-white rounded-2xl p-5 text-center hover:shadow-xl transition-all border-2 border-transparent hover:border-cyan-200 cursor-pointer">
                <div className="font-bold text-gray-900 mb-1">{s.name}</div>
                <div className="text-xs text-gray-400">{s.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center">
        <div className="text-2xl font-black mb-2"><span className="text-cyan-500">Flex</span><span className="text-white">Match</span></div>
        <p className="text-sm">2026 FlexMatch · Tous droits reserves · France</p>
      </footer>
    </main>
  );
}
