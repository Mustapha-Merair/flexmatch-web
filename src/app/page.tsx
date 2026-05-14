export default function Home() {
  const sectors = [
    { icon: '🔨', name: 'BTP', desc: '3 680 pros', color: 'from-orange-400 to-red-500' },
    { icon: '📦', name: 'Logistique', desc: '3 120 pros', color: 'from-cyan-400 to-blue-500' },
    { icon: '🍽️', name: 'Restauration', desc: '2 240 pros', color: 'from-purple-400 to-pink-500' },
    { icon: '🎪', name: 'Evenementiel', desc: '1 480 pros', color: 'from-yellow-400 to-orange-500' },
    { icon: '🧽', name: 'Nettoyage', desc: '1 240 pros', color: 'from-green-400 to-teal-500' },
    { icon: '👶', name: 'Baby-sitting', desc: '980 pros', color: 'from-pink-400 to-rose-500' },
    { icon: '🚚', name: 'Demenagement', desc: '760 pros', color: 'from-blue-400 to-indigo-500' },
    { icon: '💻', name: 'IT Tech', desc: '340 pros', color: 'from-teal-400 to-cyan-500' },
  ];

  const stats = [
    { number: '14 200', label: 'Pros verifies' },
    { number: '98%', label: 'Satisfaction' },
    { number: '30 min', label: 'Temps moyen' },
    { number: '8', label: 'Secteurs' },
  ];

  const features = [
    { icon: '📷', title: 'VisualVerify', desc: 'CNI + selfie biometrique par IA', color: 'bg-purple-100 text-purple-600' },
    { icon: '🔒', title: 'Single Device Lock', desc: 'Un compte = un seul appareil', color: 'bg-cyan-100 text-cyan-600' },
    { icon: '🛡️', title: 'ZeroRisk Protocol', desc: 'No-show ? 100% rembourse', color: 'bg-green-100 text-green-600' },
    { icon: '⭐', title: 'TrustScore', desc: 'Notation multi-criteres par IA', color: 'bg-yellow-100 text-yellow-600' },
    { icon: '💰', title: 'Cashback 3%', desc: 'Sur chaque mission completee', color: 'bg-orange-100 text-orange-600' },
    { icon: '🤖', title: 'IA Match', desc: 'Top 3 pros en 30 minutes', color: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <main className="min-h-screen bg-white">
      
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-black">
            <span className="text-cyan-500">Flex</span>
            <span className="text-gray-900">Match</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#secteurs" className="text-gray-600 hover:text-cyan-500 text-sm font-medium">Secteurs</a>
            <a href="#trust" className="text-gray-600 hover:text-cyan-500 text-sm font-medium">Trust OS</a>
            <a href="/login" className="text-cyan-600 font-semibold text-sm">Connexion</a>
            <a href="/signup" className="px-4 py-2 bg-cyan-500 text-white rounded-full text-sm font-bold hover:bg-cyan-600 transition shadow-lg shadow-cyan-200">
              Commencer
            </a>
          </div>
        </div>
      </header>

      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span>🇫🇷</span>
            <span>Disponible partout en France</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Trouve les meilleurs<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              pros en 60s
            </span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            14 200 prestataires verifies par IA · Trust OS · ZeroRisk Protocol
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/signup" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-cyan-200 transition-all transform hover:-translate-y-1 text-lg">
              Je cherche un pro
            </a>
            <a href="/signup" className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl border-2 border-gray-200 hover:border-cyan-300 transition-all text-lg">
              Je suis prestataire
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-cyan-500 to-blue-600">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center text-white">
                <div className="text-3xl md:text-4xl font-black mb-1">{s.number}</div>
                <div className="text-cyan-100 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="secteurs" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-3">8 secteurs disponibles</h2>
            <p className="text-gray-500">Des pros verifies dans tous les domaines</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sectors.map((s) => (
              <a key={s.name} href="/signup"
                className="group bg-white rounded-2xl p-5 text-center cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className={"w-14 h-14 rounded-2xl bg-gradient-to-br " + s.color + " flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform"}>
                  {s.icon}
                </div>
                <div className="font-bold text-gray-900 mb-1">{s.name}</div>
                <div className="text-xs text-gray-400">{s.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="trust" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-gray-900 text-cyan-400 px-4 py-1 rounded-full text-xs font-bold tracking-widest mb-4">
              TRUST OS
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-3">La securite FlexMatch</h2>
            <p className="text-gray-500">Chaque prestataire est verifie par notre IA avant d accepter des missions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100">
                <div className={"w-12 h-12 rounded-xl " + f.color + " flex items-center justify-center text-xl mb-4"}>
                  {f.icon}
                </div>
                <div className="font-bold text-gray-900 mb-2">{f.title}</div>
                <div className="text-gray-500 text-sm">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">Pret a commencer ?</h2>
          <p className="text-gray-400 mb-8 text-lg">Rejoins 14 200 pros et clients qui font confiance a FlexMatch</p>
          <a href="/signup" className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl text-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-1">
            Creer mon compte gratuitement
          </a>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <div className="text-2xl font-black">
            <span className="text-cyan-500">Flex</span>
            <span className="text-white">Match</span>
          </div>
          <p className="text-sm">2026 FlexMatch · Tous droits reserves · France</p>
        </div>
      </footer>
    </main>
  );
}
