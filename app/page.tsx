export default function Home() {
  const sectors = [
    { icon: '🔨', name: 'BTP', desc: '250K postes en tension', color: 'bg-orange-50 border-orange-200' },
    { icon: '📦', name: 'Logistique', desc: '3 120 pros actifs', color: 'bg-blue-50 border-blue-200' },
    { icon: '🍽️', name: 'Restauration', desc: '2 240 pros actifs', color: 'bg-purple-50 border-purple-200' },
    { icon: '🎪', name: 'Evenementiel', desc: '1 480 pros actifs', color: 'bg-yellow-50 border-yellow-200' },
    { icon: '🧽', name: 'Nettoyage', desc: '1 240 pros actifs', color: 'bg-green-50 border-green-200' },
    { icon: '👶', name: 'Baby-sitting', desc: '980 pros actifs', color: 'bg-pink-50 border-pink-200' },
    { icon: '🚚', name: 'Demenagement', desc: '760 pros actifs', color: 'bg-indigo-50 border-indigo-200' },
    { icon: '💻', name: 'IT Tech', desc: '340 pros actifs', color: 'bg-teal-50 border-teal-200' },
  ];

  const features = [
    { icon: '📷', title: 'VisualVerify', desc: 'Verification CNI + selfie biometrique par IA' },
    { icon: '🔒', title: 'Single Device Lock', desc: 'Un compte = un seul appareil autorise' },
    { icon: '🛡️', title: 'ZeroRisk Protocol', desc: 'No-show ? 100% rembourse automatiquement' },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-cyan-500">Flex</span>
            <span className="text-gray-900">Match</span>
          </div>
          <div className="flex gap-3">
            <a href="/login" className="px-4 py-2 text-cyan-600 border border-cyan-500 rounded-lg">Connexion</a>
            <a href="/signup" className="px-4 py-2 bg-cyan-500 text-white rounded-lg">Inscription</a>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-cyan-500 to-cyan-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm mb-6">
            France entiere disponible
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Trouve les meilleurs pros en 60 secondes
          </h1>
          <p className="text-xl opacity-90 mb-10">
            14 200 prestataires verifies par IA
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/signup" className="px-8 py-4 bg-white text-cyan-600 font-bold rounded-xl">
              Je cherche un pro
            </a>
            <a href="/signup" className="px-8 py-4 bg-white/20 border border-white text-white font-bold rounded-xl">
              Je suis prestataire
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            8 secteurs disponibles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sectors.map((s) => (
              <div key={s.name} className={"border rounded-xl p-4 text-center cursor-pointer hover:shadow-md transition " + s.color}>
                <div className="text-4xl mb-2">{s.icon}</div>
                <div className="font-bold text-gray-900">{s.name}</div>
                <div className="text-xs text-gray-500 mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trust OS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-gray-800 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <div className="font-bold text-lg mb-2">{f.title}</div>
                <div className="text-gray-400 text-sm">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center border-t border-gray-800">
        <div className="text-2xl font-bold mb-2">
          <span className="text-cyan-500">Flex</span>
          <span className="text-white">Match</span>
        </div>
        <p className="text-sm">2026 FlexMatch France</p>
      </footer>
    </main>
  );
}
