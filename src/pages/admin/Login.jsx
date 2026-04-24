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
      const result = await api.login(email, password);
      
      if (result.success) {
        localStorage.setItem('esend_is_auth', 'true');
        localStorage.setItem('esend_user', JSON.stringify(result.user));
        navigate('/admin/dashboard');
      } else {
        setError(result.error || 'Connexion échouée');
      }
    } catch (err) {
      console.error('Erreur Login:', err);
      setError(`Serveur indisponible : ${err.message || 'Merci de vérifier votre connexion'}`);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6 transition-colors duration-300">



      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-white rounded-2xl p-2 mb-4 border border-white/10 shadow-2xl overflow-hidden">
            <img src="./logo-esend.jpg" alt="ESEND" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter text-[var(--text-main)] uppercase">
            ESEND <span className="text-red-600">ADMIN</span>
          </h1>
          <p className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-2">
            Accès réservé aux techniciens certifiés
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[var(--bg-card)] backdrop-blur-2xl border border-[var(--border-subtle)] p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[var(--text-dimmed)] text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                E-mail
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dimmed)]" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl py-4 pl-12 pr-4 text-[var(--text-main)] focus:outline-none focus:border-red-600/50 transition-all text-sm font-medium"
                  placeholder="nom@esend.fr"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[var(--text-dimmed)] text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dimmed)]" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl py-4 pl-12 pr-4 text-[var(--text-main)] focus:outline-none focus:border-red-600/50 transition-all text-sm font-medium"
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
              className="w-full bg-red-600 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-red-700 transition-all transform active:scale-95 text-xs flex items-center justify-center gap-2 group shadow-lg shadow-red-600/20"
            >
              Connexion <ShieldCheck className="w-4 h-4 group-hover:animate-pulse" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[var(--text-dimmed)] text-[9px] font-medium mt-8 uppercase tracking-widest">
          © 2026 ESEND MENTON — SYSTÈME DE GESTION IA v2.1
        </p>
      </div>
    </div>
  );
};

export default Login;
