// src/components/Admin/ModeSelector.jsx
/**
 * @file ModeSelector.jsx — Sélecteur des 3 modes de rédaction d'articles
 * @specialist frontend-dev-guidelines, frontend-ui-dark-ts
 * Modes: IA Auto | Assistant Prompt (tunnel 4 étapes) | Rédaction Libre (template)
 */
import React from 'react';
import { Sparkles, BookOpenText, PenLine, ArrowRight, X } from 'lucide-react';

const MODES = [
  {
    id: 'ia',
    icon: Sparkles,
    color: 'from-red-600 to-indigo-600',
    glowColor: 'shadow-red-600/20',
    borderColor: 'hover:border-red-500/50',
    badge: 'Recommandé',
    badgeColor: 'bg-red-600',
    title: 'Rédaction Complète par l\'IA',
    subtitle: 'Magie totale',
    description: 'Le Radar IA détecte les sujets d\'actualité sur la Riviera. Cliquez "Rédiger avec IA" et l\'article est rédigé intégralement : titre, accroche, contenu HTML structuré, méta-tags SEO.',
    steps: ['Choisir un sujet dans le Radar', 'Cliquer "Rédiger avec IA"', 'Vérifier et publier'],
  },
  {
    id: 'prompt',
    icon: BookOpenText,
    color: 'from-blue-600 to-cyan-500',
    glowColor: 'shadow-blue-600/20',
    borderColor: 'hover:border-blue-500/50',
    badge: 'Guidé',
    badgeColor: 'bg-blue-600',
    title: 'Assistant Prompt',
    subtitle: 'Guide interactif pas à pas',
    description: 'Je vous guide en 4 étapes pour créer un article de qualité professionnelle : veille d\'actualité → sélection du sujet → rédaction → génération d\'image de couverture.',
    steps: ['Veille IA : 3 sujets proposés', 'Sélectionner & personnaliser', 'Rédaction guidée', 'Image de couverture IA'],
  },
  {
    id: 'libre',
    icon: PenLine,
    color: 'from-emerald-600 to-teal-500',
    glowColor: 'shadow-emerald-600/20',
    borderColor: 'hover:border-emerald-500/50',
    badge: 'Liberté totale',
    badgeColor: 'bg-emerald-600',
    title: 'Rédaction Libre',
    subtitle: 'Template structuré pré-rempli',
    description: 'L\'éditeur s\'ouvre avec un template HTML complet : introduction, signes à reconnaître, solution ESEND, FAQ, conclusion. Chaque section est commentée pour vous guider.',
    steps: ['Éditeur pré-rempli', 'Remplacer les placeholders', 'Publier à votre rythme'],
  },
];

const ARTICLE_TEMPLATE = `<h2>Introduction : Pourquoi ce sujet est crucial ?</h2>
<p>Rédigez ici une accroche de 2-3 phrases sur le problème traité à Menton, Monaco ou sur la Riviera...</p>

<h2>Les Signes à Reconnaître</h2>
<ul>
  <li><strong>Signe 1 :</strong> Description du premier indicateur visible...</li>
  <li><strong>Signe 2 :</strong> Description du deuxième indicateur...</li>
  <li><strong>Signe 3 :</strong> Description du troisième indicateur...</li>
</ul>

<h2>Pourquoi agir rapidement ?</h2>
<p>Expliquez les risques sanitaires ou matériels en cas d'inaction. Citez si possible une norme réelle (ANSES, Certibiocide...).</p>

<blockquote>Notre équipe certifiée intervient sur Menton, Monaco et toute la Riviera française sous 24h — discrétion et efficacité garanties.</blockquote>

<h2>La Solution Professionnelle ESEND</h2>
<p>Détaillez votre méthode d'intervention : protocole, produits homologués, durée, garanties...</p>

<h3>Étapes de notre intervention :</h3>
<ol>
  <li>診断 Diagnostic et repérage des zones infestées</li>
  <li>Traitement ciblé selon le nuisible</li>
  <li>Sécurisation et prévention des récidives</li>
</ol>

<h2>Questions Fréquentes (FAQ)</h2>
<p><strong>Combien de temps dure une intervention ?</strong><br/>Répondez ici...</p>
<p><strong>Est-ce dangereux pour les enfants/animaux ?</strong><br/>Répondez ici...</p>
<p><strong>Dans quelles zones intervenez-vous ?</strong><br/>Menton, Monaco, Roquebrune-Cap-Martin, Beausoleil, Nice et toute la Côte d'Azur.</p>

<h2>Conclusion</h2>
<p>Récapitulez l'essentiel et incitez à l'action (contact, devis gratuit).</p>`;

const ModeSelector = ({ onSelectMode, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0 border-[var(--border-subtle)] shadow-3xl">
        
        {/* Header */}
        <div className="p-8 border-b border-[var(--border-subtle)] flex justify-between items-center bg-[var(--bg-secondary)]">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter">
              Choisir votre <span className="text-red-600 italic">Mode de Rédaction</span>
            </h3>
            <p className="text-[var(--text-dimmed)] text-[10px] font-black uppercase tracking-[0.2em] mt-1">
              3 approches pour créer du contenu expert de qualité
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--bg-input)] rounded-full text-[var(--text-dimmed)] hover:text-red-600 transition-all border border-transparent hover:border-[var(--border-subtle)]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mode Cards */}
        <div className="flex-grow overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MODES.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => onSelectMode(mode.id, ARTICLE_TEMPLATE)}
                  className={`group relative flex flex-col items-start text-left p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] ${mode.borderColor} hover:shadow-2xl ${mode.glowColor} transition-all duration-300 hover:-translate-y-1 active:translate-y-0`}
                >
                  {/* Badge */}
                  <span className={`absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest text-white px-2 py-1 rounded-md ${mode.badgeColor}`}>
                    {mode.badge}
                  </span>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mode.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <div className="mb-2">
                    <p className={`text-[9px] font-black uppercase tracking-widest bg-gradient-to-r ${mode.color} bg-clip-text text-transparent mb-1`}>
                      {mode.subtitle}
                    </p>
                    <h4 className="text-base font-black uppercase tracking-tight leading-tight">
                      {mode.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-[var(--text-dimmed)] text-[11px] leading-relaxed mb-6 flex-grow">
                    {mode.description}
                  </p>

                  {/* Steps */}
                  <div className="w-full space-y-2 mb-6">
                    {mode.steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-[var(--text-dimmed)]">
                        <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${mode.color} flex items-center justify-center text-white text-[9px] font-black shrink-0`}>
                          {i + 1}
                        </span>
                        {step}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className={`w-full flex items-center justify-between bg-gradient-to-r ${mode.color} text-white px-5 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] group-hover:shadow-lg transition-all`}>
                    Choisir ce mode
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelector;
export { ARTICLE_TEMPLATE };
