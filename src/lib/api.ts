const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://flexmatch-api-production.up.railway.app';

export const api = {
  signup: (data: any) => fetch(API_URL + '/auth/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  login: (data: any) => fetch(API_URL + '/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  verifyOtp: (data: any) => fetch(API_URL + '/auth/verify-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  getMe: (token: string) => fetch(API_URL + '/auth/me', { headers: { Authorization: 'Bearer ' + token } }).then(r => r.json()),
  updateProfile: (token: string, data: any) => fetch(API_URL + '/auth/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(data) }).then(r => r.json()),
  getMissions: (filters?: any) => { const params = new URLSearchParams(filters || {}).toString(); return fetch(API_URL + '/missions' + (params ? '?' + params : '')).then(r => r.json()); },
  getMission: (id: string) => fetch(API_URL + '/missions/' + id).then(r => r.json()),
  createMission: (token: string, data: any) => fetch(API_URL + '/missions', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(data) }).then(r => r.json()),
  getCandidates: (missionId: string) => fetch(API_URL + '/missions/' + missionId + '/candidates').then(r => r.json()),
  applyMission: (token: string, missionId: string) => fetch(API_URL + '/missions/' + missionId + '/apply', { method: 'POST', headers: { Authorization: 'Bearer ' + token } }).then(r => r.json()),
  acceptApplication: (token: string, appId: string) => fetch(API_URL + '/applications/' + appId + '/accept', { method: 'PUT', headers: { Authorization: 'Bearer ' + token } }).then(r => r.json()),
  getMyApplications: (token: string) => fetch(API_URL + '/pro/applications', { headers: { Authorization: 'Bearer ' + token } }).then(r => r.json()),
  createReview: (token: string, data: any) => fetch(API_URL + '/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(data) }).then(r => r.json()),
  getProStats: (proId: string) => fetch(API_URL + '/reviews/pro/' + proId + '/stats').then(r => r.json()),
  getMessages: (missionId: string, token: string) => fetch(API_URL + '/chat/' + missionId + '/messages', { headers: { Authorization: 'Bearer ' + token } }).then(r => r.json()),
  sendMessage: (token: string, missionId: string, content: string) => fetch(API_URL + '/chat/' + missionId + '/messages', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify({ content }) }).then(r => r.json()),
  getFavorites: (token: string) => fetch(API_URL + '/favorites', { headers: { Authorization: 'Bearer ' + token } }).then(r => r.json()),
  addFavorite: (token: string, proId: string) => fetch(API_URL + '/favorites/' + proId, { method: 'POST', headers: { Authorization: 'Bearer ' + token } }).then(r => r.json()),
};

export const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('fm_token') || '' : '';
export const getUser = () => { if (typeof window === 'undefined') return null; const u = localStorage.getItem('fm_user'); return u ? JSON.parse(u) : null; };
export const setAuth = (token: string, user: any) => { localStorage.setItem('fm_token', token); localStorage.setItem('fm_user', JSON.stringify(user)); };
export const logout = () => { localStorage.removeItem('fm_token'); localStorage.removeItem('fm_user'); };

export const SECTORS = [
  { icon: '🍽️', name: 'Restauration', jobs: ['Serveur', 'Barman', 'Cuisinier', 'Runner'] },
  { icon: '📦', name: 'Logistique', jobs: ['Livreur', 'Manutentionnaire', 'VTC', 'Coursier'] },
  { icon: '🧽', name: 'Nettoyage', jobs: ['Menage maison', 'Bureau', 'Vitres', 'Repassage'] },
  { icon: '🎪', name: 'Evenementiel', jobs: ['Animateur', 'Hotesse', 'Technicien', 'Securite'] },
  { icon: '🏠', name: 'Domicile', jobs: ['Baby-sitting', 'Jardinage', 'Bricolage', 'Demenagement'] },
  { icon: '🔧', name: 'Artisanat', jobs: ['Plomberie', 'Electricite', 'Peinture', 'Serrurerie'] },
  { icon: '💻', name: 'IT Tech', jobs: ['Dev web', 'Dev mobile', 'UI/UX', 'Support IT'] },
  { icon: '🚗', name: 'Automobile', jobs: ['Lavage', 'Mecanique', 'Convoyage', 'Carrosserie'] },
];

export const TRUST_COLORS: Record<string, string> = {
  BRONZE: '#cd7f32', SILVER: '#c0c0c0', GOLD: '#ffd700', DIAMOND: '#00C2C3', LEGEND: '#7c4dff',
};
