import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowLeft, TrendingUp, Bug, Sparkles, Activity } from 'lucide-react';

// --- Palette de Couleurs "Frozen Night" ---
const COLORS = {
  nuisibles: '#ef4444', // Red-500
  nettoyage: '#6366f1', // Indigo-500
  desinfection: '#06b6d4', // Cyan-500
  // Sous-catégories Nuisibles
  rats: '#fb923c', // Orange-400
  souris: '#fcd34d', // Amber-300
  cafards: '#a8a29e', // Stone-400
  punaises: '#991b1b', // Red-800
  guepes: '#eab308' // Yellow-500
};

// --- Composant Tooltip Customisé Glassmorphism ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-md">
        <p className="text-white font-black uppercase tracking-widest text-xs mb-3 border-b border-white/10 pb-2">{label}</p>
        <div className="space-y-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-300">{entry.name}</span>
              </div>
              <span className="text-white font-black">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

// --- Composant Principal ---
const AnalyticsTab = ({ leads }) => {
  // viewMode: 'global' | 'nuisibles'
  const [viewMode, setViewMode] = useState('global');
  // timeRange: 'day' | 'week' | 'month' | 'year'
  const [timeRange, setTimeRange] = useState('month');

  // Génération de Mock Data (Adaptative selon timeRange)
  const chartData = useMemo(() => {
    const data = [];
    let labels = [];
    let points = 0;
    let baseMultiplier = 1;
    let mulN = 1, mulD = 1;

    if (timeRange === 'day') {
      points = 14;
      baseMultiplier = 0.15; // Moins de leads par jour
      for (let i = 14; i > 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        labels.push(`${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`);
      }
    } else if (timeRange === 'week') {
      points = 12;
      baseMultiplier = 0.8;
      for (let i = 12; i > 0; i--) labels.push(`S-${i}`);
    } else if (timeRange === 'month') {
      points = 12;
      baseMultiplier = 1;
      labels = ['Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar', 'Avr', 'Mai'];
    } else if (timeRange === 'year') {
      points = 5;
      baseMultiplier = 12;
      labels = ['2022', '2023', '2024', '2025', '2026'];
    }

    let baseN = 25 * baseMultiplier, baseD = 12 * baseMultiplier, baseC = 18 * baseMultiplier;

    for (let i = 0; i < points; i++) {
      if (timeRange === 'month') {
        mulN = ['Juin', 'Juil', 'Aoû', 'Sep'].includes(labels[i]) ? 2.5 : 1;
        mulD = ['Déc', 'Jan', 'Fév'].includes(labels[i]) ? 1.8 : 1;
      } else {
        mulN = 1 + (Math.random() * 0.5);
        mulD = 1 + (Math.random() * 0.5);
      }

      const nuisiblesTotal = Math.max(0, Math.floor((baseN + Math.random() * 15 * baseMultiplier) * mulN));
      const nettoyageTotal = Math.max(0, Math.floor(baseC + Math.random() * 8 * baseMultiplier));
      const desinfectionTotal = Math.max(0, Math.floor((baseD + Math.random() * 5 * baseMultiplier) * mulD));

      data.push({
        name: labels[i],
        Nuisibles: nuisiblesTotal,
        Nettoyage: nettoyageTotal,
        Désinfection: desinfectionTotal,
        Rats: Math.floor(nuisiblesTotal * 0.3),
        Souris: Math.floor(nuisiblesTotal * 0.2),
        Cafards: Math.floor(nuisiblesTotal * 0.25),
        Punaises: Math.floor(nuisiblesTotal * 0.15),
        Guêpes: Math.floor(nuisiblesTotal * 0.1)
      });
    }
    return data;
  }, [leads, timeRange]);

  // KPIs (Basé sur la dernière période du timeRange sélectionné)
  const currentPeriod = chartData[chartData.length - 1];
  const totalActuel = currentPeriod.Nuisibles + currentPeriod.Nettoyage + currentPeriod.Désinfection;
  
  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-6xl mx-auto">
      
      {/* Header & KPIs */}
      <div>
        <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
          <Activity className="w-6 h-6 text-indigo-500" />
          Intelligence d'Activité
        </h3>
        <p className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1">
          Analyse dynamique des volumes de demandes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Période" value={totalActuel} trend="+12%" icon={<TrendingUp />} color="text-indigo-500" bg="bg-indigo-500/10" />
        <StatCard title="Pôle Nuisibles" value={currentPeriod.Nuisibles} trend="+24%" icon={<Bug />} color="text-red-500" bg="bg-red-500/10" />
        <StatCard title="Pôle Propreté" value={currentPeriod.Nettoyage + currentPeriod.Désinfection} trend="-5%" icon={<Sparkles />} color="text-cyan-500" bg="bg-cyan-500/10" />
      </div>

      {/* Zone Graphique Principale */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        
        {/* Navigation Drill-down et Filtres Temporels */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <AnimatePresence mode="wait">
              {viewMode !== 'global' && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => setViewMode('global')}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
            <h4 className="font-black uppercase tracking-widest text-sm text-slate-800">
              {viewMode === 'global' ? 'Répartition Globale (Services)' : 'Détail d\'activité : Nuisibles'}
            </h4>
            
            {viewMode === 'global' && (
              <button 
                onClick={() => setViewMode('nuisibles')}
                className="text-[10px] font-bold uppercase tracking-widest bg-red-50 text-red-600 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors border border-red-100 flex items-center gap-2"
              >
                <Bug className="w-3 h-3" />
                Zoom Nuisibles
              </button>
            )}
          </div>

          {/* Sélecteur de Granularité */}
          <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200 self-end md:self-auto shrink-0">
            {['day', 'week', 'month', 'year'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${timeRange === range ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {range === 'day' ? 'Jour' : range === 'week' ? 'Sem' : range === 'month' ? 'Mois' : 'Année'}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {/* Gradients Globaux */}
                <linearGradient id="colorNuisibles" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.nuisibles} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.nuisibles} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorNettoyage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.nettoyage} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.nettoyage} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDesinfection" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.desinfection} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.desinfection} stopOpacity={0} />
                </linearGradient>

                {/* Gradients Nuisibles */}
                <linearGradient id="colorRats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.rats} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.rats} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSouris" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.souris} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.souris} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCafards" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.cafards} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.cafards} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} 
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Rendu Conditionnel des Séries selon le viewMode */}
              {viewMode === 'global' ? (
                <>
                  <Area type="monotone" dataKey="Nuisibles" stroke={COLORS.nuisibles} strokeWidth={3} fillOpacity={1} fill="url(#colorNuisibles)" activeDot={{ r: 6, strokeWidth: 0 }} />
                  <Area type="monotone" dataKey="Nettoyage" stroke={COLORS.nettoyage} strokeWidth={3} fillOpacity={1} fill="url(#colorNettoyage)" activeDot={{ r: 6, strokeWidth: 0 }} />
                  <Area type="monotone" dataKey="Désinfection" stroke={COLORS.desinfection} strokeWidth={3} fillOpacity={1} fill="url(#colorDesinfection)" activeDot={{ r: 6, strokeWidth: 0 }} />
                </>
              ) : (
                <>
                  <Area type="monotone" dataKey="Rats" stroke={COLORS.rats} strokeWidth={3} fillOpacity={1} fill="url(#colorRats)" stackId="1" />
                  <Area type="monotone" dataKey="Souris" stroke={COLORS.souris} strokeWidth={3} fillOpacity={1} fill="url(#colorSouris)" stackId="1" />
                  <Area type="monotone" dataKey="Cafards" stroke={COLORS.cafards} strokeWidth={3} fillOpacity={1} fill="url(#colorCafards)" stackId="1" />
                  <Area type="monotone" dataKey="Punaises" stroke={COLORS.punaises} strokeWidth={3} fillOpacity={1} fill="#991b1b" stackId="1" />
                  <Area type="monotone" dataKey="Guêpes" stroke={COLORS.guepes} strokeWidth={3} fillOpacity={1} fill="#eab308" stackId="1" />
                </>
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// --- Petit Composant StatCard ---
const StatCard = ({ title, value, trend, icon, color, bg }) => {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-slate-300 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-2xl ${bg} ${color} flex items-center justify-center`}>
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
        <h5 className="font-black uppercase tracking-widest text-[10px] text-slate-500">{title}</h5>
      </div>
      <div className="flex items-end gap-3">
        <span className="text-4xl font-black tracking-tighter text-slate-900">{value}</span>
        <span className={`text-[10px] font-black uppercase tracking-widest mb-1 px-2 py-1 rounded-md ${isPositive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
};

export default AnalyticsTab;
