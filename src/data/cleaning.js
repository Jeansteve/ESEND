import { Sun, Wind, Droplets, Sparkles, Layout, Scaling, Construction, Zap } from 'lucide-react';

export const cleaningData = {
  title: "Hub Nettoyage & Vitrerie",
  subtitle: "Précision Cristalline & Valorisation d'Espace",
  rank: "RANK_PRO+",
  code: "PROTOCOL CRYSTAL-06",
  heroImage: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=2070&auto=format&fit=crop",
  intro: "L'image de votre patrimoine commence par la clarté de vos vitrages et la netteté de vos surfaces. ESEND transforme l'entretien classique en une prestation de haute précision, utilisant des technologies d'eau pure et des protocoles de remise en état qui redonnent à vos espaces leur éclat originel.",

  protocols: [
    {
      id: "vitrerie",
      title: "Vitrerie de Précision",
      icon: Layout,
      desc: "Nettoyage de vitres toutes hauteurs, cadres et feuillures inclus. Utilisation de systèmes à eau pure pour un séchage sans trace et une protection anti-statique durable.",
      features: ["Accès difficiles (Perches 15m)", "Traitement Hydrophobe", "Finitions Châssis & Rails"]
    },
    {
      id: "remise-en-etat",
      title: "Remise en État après Travaux",
      icon: Construction,
      desc: "Élimination radicale des traces de chantiers : laitance de ciment, poussière fine de plâtre, résidus de peinture. Restauration de l'état neuf avant livraison.",
      features: ["Aspiration HEPA (Micro-poussières)", "Grattage de précision", "Décapage de sols"]
    },
    {
      id: "sinistre",
      title: "Bio-Nettoyage après Sinistre",
      icon: Zap,
      desc: "Intervention d'urgence après dégât des eaux ou incendie. Nettoyage technique, désodorisation et décontamination des surfaces impactées.",
      features: ["Lessivage technique", "Traitement des odeurs", "Bio-décontamination"]
    }
  ],

  mythes: [
    {
      id: 1,
      m: "Le papier journal est la meilleure méthode pour nettoyer les vitres.",
      r: "Faux. L'encre d'imprimerie moderne laisse des résidus gras et peut rayer les traitements de surface des verres récents. La microfibre de précision et l'eau pure sont bien supérieures.",
      icon: Wind
    },
    {
      id: 2,
      m: "La pluie salit les vitres immédiatement après le passage du laveur.",
      r: "Mythe. C'est la poussière et la pollution accumulées sur la vitre qui, mélangées à la pluie, créent des traces. Une vitre parfaitement propre laisse glisser l'eau sans laisser de marques.",
      icon: Sun
    },
    {
      id: 3,
      m: "L'eau de Javel est idéale pour rendre l'éclat aux sols en marbre.",
      r: "Réalité dangereuse. L'eau de Javel est acide pour la pierre calcaire comme le marbre. Elle finit par 'brûler' la surface, la rendant poreuse et définitivement terne.",
      icon: Sparkles
    }
  ],

  faq: [
    {
      q: "Quelle est la fréquence idéale pour le nettoyage de mes vitres ?",
      a: "Pour un particulier à Menton (zone maritime), nous recommandons un passage tous les 2 à 3 mois. Pour un commerce avec vitrine sur rue passante, un entretien mensuel est nécessaire pour garder un impact visuel optimal."
    },
    {
      q: "Utilisez-vous des produits écologiques pour vos prestations ?",
      a: "Oui. Nous privilégions les produits certifiés Éco-Label et des méthodes mécaniques ou à l'eau pure. C'est plus sain pour vos occupants et plus respectueux de l'environnement de la Riviera."
    },
    {
      q: "Faut-il vider les pièces avant un nettoyage après travaux ?",
      a: "Pas nécessairement. Nous adaptons notre intervention à l'état du chantier. Si le mobilier est présent, nous assurons une protection complète avant de commencer l'aspiration et le lessivage."
    },
    {
      q: "Intervenez-vous pour le nettoyage des panneaux solaires ?",
      a: "Absolument. Un panneau solaire propre gagne jusqu'à 15% d'efficacité. Notre système à eau pure est la méthode recommandée par les fabricants car il ne laisse aucun résidu calcaire."
    },
    {
      q: "Pouvez-vous nettoyer des vitres inaccessibles sans nacelle ?",
      a: "Oui, grâce à nos perches télescopiques à eau pure, nous traitons des vitrages jusqu'à 15 mètres de haut directement depuis le sol, ce qui réduit les coûts et les risques pour nos clients."
    },
    {
      q: "Quelle est la différence entre un nettoyage classique et une remise en état ?",
      a: "Le nettoyage classique entretient la propreté. La remise en état est une action 'choc' qui utilise des machines (monobrosses, extracteurs) pour retirer les couches accumulées ou les résidus de chantier."
    },
    {
      q: "Est-ce que vous proposez du repassage ou du ménage à domicile ?",
      a: "Non. ESEND se spécialise exclusivement dans le nettoyage technique et professionnel (vitrerie, fins de chantiers, locaux pro, sinistres). Nous ne faisons pas d'entretien ménager courant."
    },
    {
      q: "Comment gérez-vous le nettoyage des sols délicats comme le parquet ?",
      a: "Nous utilisons des méthodes à humidité contrôlée et des microfibres spécifiques. Chaque sol (parquet, pierre bleue, marbre) a son propre protocole pour éviter tout gonflement ou rayure."
    },
    {
      q: "Le nettoyage après travaux inclut-il l'évacuation des gravats ?",
      a: "Nous nous occupons du nettoyage fin. Si des gravats volumineux sont présents, nous pouvons coupler l'intervention avec notre service de débarrassage dédié."
    },
    {
      q: "Combien de temps dure une intervention sur une maison moyenne ?",
      a: "Pour une vitrerie complète (intérieur, extérieur, rails), il faut compter environ 4 à 6 heures. Une remise en état après travaux peut prendre une journée entière selon la surface."
    },
    {
      q: "Quelles garanties offrez-vous sur la finition de vos vitres ?",
      a: "Notre engagement 'Crystal-View' garantit un résultat sans voile ni traces. Si un défaut est constaté après séchage, nous repassons gratuitement dans les 24 heures."
    }
  ]
};
