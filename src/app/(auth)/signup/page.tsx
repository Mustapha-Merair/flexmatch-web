'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, setAuth } from '@/lib/api';

export default function Signup() {
  const router = useRouter();
  const [type, setType] = useState('CLIENT');
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', phone: '', city: 'Paris' });
  const [otp, setOtp] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    const data = await api.signup({ ...form, type });
    if (data.token) {
      setAuth(data.token, data.user);
      setOtpCode(data.otpCode || '');
      setStep(2);
    } else {
      setError(data.message || 'Erreur inscription');
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    setLoading(true);
    const data = await api.verifyOtp({ email: form.email, code: otp });
    if (data.message) {
      router.push(type === 'PRO' ? '/pro/dashboard' : '/client/dashboard');
    }
    setLoading(false);
  };

  if (step === 2) return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-5xl mb-4">EMAIL</div>
        <h2 className="text-2xl font-black mb-2">Verifie ton email</h2>
        <p className="text-gray-500 mb-4">Code envoye a <strong>{form.email}</strong></p>
        {otpCode && <div className="bg-cyan-50 p-3 rounded-xl mb-4 text-sm text-cyan-700">Code de test : <strong>{otpCode}</strong></div>}
        <input className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-cyan-400 outline-none text-center text-2xl font-bold tracking-widest mb-4"
          placeholder="000000" maxLength={6} value={otp} onChange={e => setOtp(e.target.value)} />
        <button onClick={handleVerify} disabled={loading || otp.length < 6}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl disabled:opacity-50">
          {loading ? 'Verification...' : 'Confirmer'}
        </button>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black"><span className="text-cyan-500">Flex</span><span className="text-gray-900">Match</span></h1>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-black mb-6">Inscription</h2>
          <div className="flex gap-2 mb-6">
            <button onClick={() => setType('CLIENT')}
              className={"flex-1 py-3 rounded-xl font-bold text-sm transition-all " + (type === 'CLIENT' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'bg-gray-50 text-gray-600 border-2 border-gray-100')}>
              Client
            </button>
            <button onClick={() => setType('PRO')}
              className={"flex-1 py-3 rounded-xl font-bold text-sm transition-all " + (type === 'PRO' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'bg-gray-50 text-gray-600 border-2 border-gray-100')}>
              Prestataire
            </button>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input className="px-3 py-2.5 border-2 border-gray-100 rounded-xl focus:border-cyan-400 outline-none text-sm bg-gray-50"
                placeholder="Prenom" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} />
              <input className="px-3 py-2.5 border-2 border-gray-100 rounded-xl focus:border-cyan-400 outline-none text-sm bg-gray-50"
                placeholder="Nom" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
            </div>
            <input className="w-full px-3 py-2.5 border-2 border-gray-100 rounded-xl focus:border-cyan-400 outline-none text-sm bg-gray-50"
              type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <input className="w-full px-3 py-2.5 border-2 border-gray-100 rounded-xl focus:border-cyan-400 outline-none text-sm bg-gray-50"
              type="password" placeholder="Mot de passe" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            <input className="w-full px-3 py-2.5 border-2 border-gray-100 rounded-xl focus:border-cyan-400 outline-none text-sm bg-gray-50"
              placeholder="Telephone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            <select className="w-full px-3 py-2.5 border-2 border-gray-100 rounded-xl focus:border-cyan-400 outline-none text-sm bg-gray-50"
              value={form.city} onChange={e => setForm({...form, city: e.target.value})}>
              <option>Paris</option><option>Lyon</option><option>Marseille</option>
              <option>Toulouse</option><option>Bordeaux</option><option>Lille</option>
            </select>
          </div>
          {error && <div className="mt-3 p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}
          <button onClick={handleSignup} disabled={loading || !form.firstName || !form.email || !form.password}
            className="w-full mt-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl disabled:opacity-50">
            {loading ? 'Creation...' : 'Creer mon compte'}
          </button>
          <p className="mt-4 text-center text-sm text-gray-500">
            Deja un compte ? <a href="/login" className="text-cyan-500 font-bold">Se connecter</a>
          </p>
        </div>
      </div>
    </main>
  );
}
