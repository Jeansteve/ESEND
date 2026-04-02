import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ShieldCheck } from 'lucide-react';
import { api } from '../../lib/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const settings = await api.getSettings();
      
      if (!settings) {
        throw new Error('Le serveur ne répond pas (Réponse vide)');
      }

      // On accepte admin@esend.fr comme identifiant universel OU l'email de contact paramétré
      const isValidEmail = (email === 'admin@esend.fr' || email === settings.contact_email);
      const isValidPassword = (password === settings.admin_password);

      if (isValidEmail && isValidPassword) {
        localStorage.setItem('esend_is_auth', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Identifiants incorrects (Vérifiez vos paramètres)');
      }
    } catch (err) {
      console.error('Erreur Login:', err);
      setError(`Erreur de connexion : ${err.message || 'Impossible de contacter l\'API'}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-white rounded-2xl p-2 mb-4 border border-white/10 shadow-2xl">
            <img src="./logo-esend.jpg" alt="ESEND" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">
            ESEND <span className="text-red-600">ADMIN</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2">
            Accès réservé aux techniciens certifiés
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                E-mail
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-red-600/50 transition-all text-sm font-medium"
                  placeholder="nom@esend.fr"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-red-600/50 transition-all text-sm font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-600/10 border border-red-600/20 text-red-500 text-[11px] font-bold py-3 px-4 rounded-xl text-center">
                {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-red-600 hover:text-white transition-all transform active:scale-95 text-xs flex items-center justify-center gap-2 group"
            >
              Connexion <ShieldCheck className="w-4 h-4 group-hover:animate-pulse" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-600 text-[9px] font-medium mt-8 uppercase tracking-widest">
          © 2026 ESEND MENTON — SYSTÈME DE GESTION IA v1.4
        </p>
      </div>
    </div>
  );
};

export default Login;
