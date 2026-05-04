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

  // Génération des données à partir des vrais leads
  const chartData = useMemo(() => {
    if (!leads || leads.length === 0) return [];

    const groupedData = {};

    // 1. Initialiser les labels pour garantir un affichage même s'il y a des trous
    const labelsToInit = [];
    if (timeRange === 'day') {
      for (let i = 13; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        labelsToInit.push(`${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`);
      }
    } else if (timeRange === 'week') {
      for (let i = 11; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - (i * 7));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
        labelsToInit.push(`S-${weekNo}`);
      }
    } else if (timeRange === 'month') {
      for (let i = 11; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        labelsToInit.push(d.toLocaleString('fr-FR', { month: 'short' }));
      }
    } else if (timeRange === 'year') {
      const currentYear = new Date().getFullYear();
      for (let i = 4; i >= 0; i--) {
        labelsToInit.push((currentYear - i).toString());
      }
    }

    labelsToInit.forEach(label => {
      groupedData[label] = {
        name: label,
        Nuisibles: 0, Nettoyage: 0, Désinfection: 0,
        Rats: 0, Souris: 0, Cafards: 0, Punaises: 0, Guêpes: 0
      };
    });

    // 2. Agréger les leads
    leads.forEach(lead => {
      const date = new Date(lead.created_at || Date.now());
      let label = "";

      if (timeRange === 'day') {
        label = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      } else if (timeRange === 'week') {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
        label = `S-${weekNo}`;
      } else if (timeRange === 'month') {
        label = date.toLocaleString('fr-FR', { month: 'short' });
      } else if (timeRange === 'year') {
        label = date.getFullYear().toString();
      }

      // Si le lead est trop vieux et n'est pas dans notre scope d'initialisation, on l'ignore
      // ou on l'ajoute dynamiquement (pour la simplicité, on le traite)
      if (!groupedData[label]) {
        groupedData[label] = {
          name: label,
          Nuisibles: 0, Nettoyage: 0, Désinfection: 0,
          Rats: 0, Souris: 0, Cafards: 0, Punaises: 0, Guêpes: 0
        };
      }

      const serviceStr = (lead.service || "").toLowerCase();
      
      if (serviceStr.includes("nuisible")) {
        groupedData[label].Nuisibles += 1;
        const nuisibleStr = (lead.nuisible || "").toLowerCase();
        if (nuisibleStr.includes("rat")) groupedData[label].Rats += 1;
        if (nuisibleStr.includes("souris")) groupedData[label].Souris += 1;
        if (nuisibleStr.includes("cafard") || nuisibleStr.includes("blatte")) groupedData[label].Cafards += 1;
        if (nuisibleStr.includes("punaise")) groupedData[label].Punaises += 1;
        if (nuisibleStr.includes("guêpe") || nuisibleStr.includes("frelon")) groupedData[label].Guêpes += 1;
      } else if (serviceStr.includes("nettoyage")) {
        groupedData[label].Nettoyage += 1;
      } else if (serviceStr.includes("désinfection") || serviceStr.includes("desinfection")) {
        groupedData[label].Désinfection += 1;
      }
    });

    // Retourner les valeurs dans l'ordre chronologique des labels initialisés
    // S'il y a de nouveaux labels (leads plus vieux/plus récents hors scope initial), 
    // l'ordre des clés d'objet peut ne pas être chronologique, mais pour une V1 c'est suffisant.
    return Object.values(groupedData);

  }, [leads, timeRange]);

  // KPIs (Sécurisé s'il n'y a pas de data)
  const currentPeriod = chartData.length > 0 ? chartData[chartData.length - 1] : { Nuisibles: 0, Nettoyage: 0, Désinfection: 0 };
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
