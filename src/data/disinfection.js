import { Shield, Zap, Wind, Droplets, FlaskConical, Beaker, Thermometer, UserCheck } from 'lucide-react';

export const disinfectionData = {
  title: "Hub Désinfection & Bio-Sécurité",
  subtitle: "Éradication Microbienne & Protection Sanitaire",
  rank: "RANK_S+",
  code: "PROTOCOL HYGIENE-06",
  heroImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
  intro: "Dans un monde où les menaces invisibles évoluent, la désinfection ne peut plus être une simple option. ESEND déploie des protocoles de bio-sécurité de niveau hospitalier pour neutraliser 99,99% des virus, bactéries et champignons, garantissant la sécurité de vos espaces de vie et de travail.",

  protocols: [
    {
      id: "nebulisation",
      title: "Nébulisation ULV (Fogging)",
      icon: Wind,
      desc: "Diffusion de micro-gouttelettes virucides en suspension. Idéal pour traiter l'intégralité du volume d'une pièce, incluant les zones inaccessibles et l'air ambiant.",
      features: ["Action 3D (Air + Surfacique)", "Pénétration dans les gaines VMC", "Aucun résidu humide"]
    },
    {
      id: "contact",
      title: "Désinfection par Contact Haut Débit",
      icon: Droplets,
      desc: "Application ciblée sur les points de contact critiques (poignées, claviers, rampes). Utilisation de solutions rémanentes pour une protection prolongée.",
      features: ["Cible les zones à haut flux", "Produits biodégradables", "Séchage instantané"]
    },
    {
      id: "post-nuisibles",
      title: "Bio-Nettoyage Post-Nuisibles",
      icon: Shield,
      desc: "Traitement spécifique après infestation (rongeurs, pigeons). Neutralisation des agents pathogènes comme la Leptospirose ou l'Hantavirus.",
      features: ["Élimination des phéromones", "Destruction des spores", "Certification Sanitaire"]
    }
  ],

  mythes: [
    {
      id: 1,
      m: "L'odeur de Javel est synonyme de propreté absolue.",
      r: "Faux. L'eau de Javel est un excellent désinfectant mais un mauvais nettoyant. Elle ne pénètre pas les surfaces poreuses et peut même favoriser le développement de biofilms si elle est mal utilisée.",
      icon: FlaskConical
    },
    {
      id: 2,
      m: "Une simple pulvérisation de vinaigre blanc tue tous les virus.",
      r: "Mythe. Bien que le vinaigre soit écologique, il n'est pas reconnu comme virucide selon les normes NF EN 14476. Il est inefficace contre les virus résistants (comme la Polio ou certains Adénovirus).",
      icon: Beaker
    },
    {
      id: 3,
      m: "Désinfecter une fois suffit pour être protégé pendant des mois.",
      r: "Réalité nuancée. La désinfection tue les micro-organismes présents à l'instant T. Sans application d'un agent rémanent spécifique, la surface peut être re-contaminée dès le passage suivant.",
      icon: UserCheck
    }
  ],

  faq: [
    {
      q: "Combien de temps faut-il attendre avant de réoccuper les lieux ?",
      a: "Pour une désinfection par nébulisation, nous préconisons un délai de 2 à 4 heures selon le volume et la ventilation. Ce temps permet aux micro-gouttelettes de se déposer et à l'air de se renouveler totalement."
    },
    {
      q: "Vos produits sont-ils dangereux pour les animaux de compagnie ?",
      a: "Non. Nous utilisons exclusivement des produits biocide homologués qui, une fois secs, sont totalement inoffensifs pour les animaux. Cependant, ils doivent être tenus à l'écart pendant la phase de traitement par nébulisation."
    },
    {
      q: "Est-ce que la nébulisation abîme le matériel informatique ?",
      a: "Absolument pas. La nébulisation ULV produit un 'brouillard sec'. Les gouttelettes sont si fines (5 à 20 microns) qu'elles ne mouillent pas les circuits. C'est la méthode privilégiée pour les bureaux et data-centers."
    },
    {
      q: "Traitez-vous contre les moisissures et les champignons ?",
      a: "Oui. Notre protocole inclut des agents fongicides puissants conformes à la norme EN 1650. Nous traitons non seulement les traces visibles, mais aussi les spores invisibles dans l'air pour éviter la récidive."
    },
    {
      q: "Quelle est la différence entre nettoyage et désinfection ?",
      a: "Le nettoyage élimine la saleté visible. La désinfection tue les micro-organismes invisibles. Dans nos protocoles, nous effectuons toujours une phase de nettoyage préalable pour garantir que le désinfectant agisse directement sur la surface."
    },
    {
      q: "Quelles normes respectent vos produits virucides ?",
      a: "Tous nos produits sont certifiés NF EN 14476 (Virucide), EN 1276 (Bactéricide) et EN 1650 (Fongicide). Ils sont efficaces contre les virus enveloppés comme le Coronavirus et la Grippe."
    },
    {
      q: "Peut-on désinfecter des textiles (canapés, rideaux) ?",
      a: "Oui, la nébulisation est particulièrement efficace sur les textiles car elle pénètre les fibres sans les imbiber d'eau, neutralisant les acariens et les bactéries logées en profondeur."
    },
    {
      q: "Proposez-vous des contrats de désinfection préventive ?",
      a: "Tout à fait. Pour les ERP (Établissements Recevant du Public), nous mettons en place des passages réguliers (mensuels ou trimestriels) pour maintenir une pression microbienne basse."
    },
    {
      q: "La désinfection élimine-t-elle les mauvaises odeurs ?",
      a: "Oui, car la plupart des mauvaises odeurs sont causées par l'activité bactérienne. En éliminant la source microbienne, nous neutralisons les odeurs à la racine au lieu de simplement les masquer."
    },
    {
      q: "En quoi consiste la désinfection post-décès ou syndrome de Diogène ?",
      a: "C'est un protocole spécialisé incluant le retrait des charges organiques, une désodorisation par ozone ou nébulisation lourde, et une bio-décontamination complète pour rendre le logement à nouveau habitable."
    },
    {
      q: "Les surfaces traitées restent-elles désinfectées longtemps ?",
      a: "Nous pouvons appliquer des solutions avec un effet de rémanence certifié (jusqu'à 30 jours), mais cela dépend énormément du flux de passage et de la fréquence de nettoyage manuel après notre intervention."
    }
  ]
};
