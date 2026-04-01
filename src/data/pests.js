export const pests = {
  'punaises-de-lit': {
    title: 'Punaises de lit',
    image: '/images/punaises-de-lit.jpg',
    description: 'Expertise Éradication : Protocole Punaise',
    faq: [
      { q: "Qu'est-ce qu'une punaise de lit ?", a: "C'est un insecte nocturne qui se nourrit exclusivement de sang humain..." },
      { q: "Pourquoi apparaissent-elles ?", a: "Elles ne sont pas liées à un manque de propreté. Elles sont ramenées via des bagages, des meubles d'occasion..." },
      { q: "Est-ce dangereux ?", a: "Non, elles ne transmettent pas de maladies, mais les piqûres provoquent de fortes démangeaisons et des troubles psychologiques..." },
      { q: "Puis-je les traiter moi-même ?", a: "Fortement déconseillé. Les produits grand public provoquent souvent une résistance et dispersent la colonie..." },
      { q: "Pourquoi passer par un pro ?", a: "Parce que nous utilisons des méthodes combinées (vapeur, froid, produits rémanents) qui ciblent les œufs et les nymphes..." }
    ],
    actionImmediate: "Ne déplacez pas votre mobilier dans d'autres chambres, cela propage l'infestation. Isolez votre literie et appelez-nous pour un diagnostic sous 2h."
  },
  'rats': {
    title: 'Rats & Souris',
    image: '/images/rats-souris.jpg',
    description: 'Sécurisation & Éradication',
    faq: [
        { q: "Quels sont les risques si je ne fais rien ?", a: "Dégâts électriques (incendies), maladies (leptospirose), dégradation des structures isolantes." },
        { q: "Comment les détecter ?", a: "Bruits de grattements, excréments, traces de gras le long des plinthes." }
    ],
    actionImmediate: "Si vous entendez des bruits de grattements dans les plafonds, ne bouchez pas les trous d'accès immédiatement, vous pourriez enfermer l'animal à l'intérieur, ce qui causerait une odeur de putréfaction.",
    mythesVsRealite: [
      { mythe: "Les chats feront fuir les rongeurs.", realite: "Un chat ne chassera pas une colonie entière, et les rats peuvent même s'attaquer aux croquettes du chat." }
    ]
  },
  'cafards': {
    title: 'Cafards & Blattes',
    image: '/images/cafards.jpg',
    description: 'Désinsectisation Rapide & Préventive',
    faq: [
      { q: "Pourquoi ai-je des cafards alors que c'est propre ?", a: "Ils peuvent être rapportés par des emballages de supermarché ou voyager via les conduits d'aération des voisins." },
      { q: "Un cafard écrasé libère-t-il ses œufs ?", a: "S'il porte une oothèque (poche d'œufs), oui. Mieux vaut utiliser un aspireur ou un produit spécifique." },
      { q: "Vos produits sont-ils toxiques pour mes animaux ?", a: "Nous appliquons des gels professionnels inodores et inaccessibles aux animaux domestiques, ciblant uniquement la consommation par les blattes." }
    ],
    actionImmediate: "Rangez tout aliment ouvert dans des boîtes hermétiques. Essuyez toute trace d'humidité (éviers, douches), car le cafard recherche d'abord l'eau pour survivre.",
    mythesVsRealite: [
      { mythe: "La Javel fera fuir les cafards.", realite: "Certaines espèces peuvent s'habituer, et les solutions artisanales ne tuent pas le nid complet." }
    ]
  },
  'frelons': {
    title: 'Guêpes & Frelons',
    image: '/images/frelons.jpg',
    description: 'Destruction de nids sécurisée',
    faq: [
      { q: "Quelle est la différence entre une guêpe et un frelon ?", a: "Le frelon est beaucoup plus gros et son vol est bruyant. Le frelon asiatique attaque en groupe s'il se sent menacé près du nid." },
      { q: "Puis-je détruire un petit nid avec de la bombe insecticide ?", a: "Non ! Si le nid n'est pas complètement aspergé d'un coup, les centaines d'individus à l'intérieur vont sortir et vous attaquer massivement." },
      { q: "Que faire du nid une fois traité ?", a: "La poudre bio-rémanente que nous utilisons continue d'agir pendant plusieurs jours sur les insectes revenant de l'extérieur. Le nid meurt chimiquement de lui-même." }
    ],
    actionImmediate: "Ne vous approchez pas à moins de 5 mètres du nid. Ne provoquez aucune vibration (fermeture brutale de porte, tondeuse) et contactez notre équipe sans délai.",
    mythesVsRealite: [
      { mythe: "Boucher l'entrée du nid résoudra le problème.", realite: "Ils trouveront une autre sortie, souvent en rongeant l'isolation ou le placo pour entrer à l'intérieur de la maison !" }
    ]
  },
  'fourmis': {
    title: 'Fourmis (Invasion)',
    image: '/images/fourmis.jpg',
    description: 'Identification des pistes & Éradication',
    faq: [
      { q: "Pourquoi reviennent-elles toujours au même endroit ?", a: "Elles laissent une 'piste phéromonale' invisible. Tant que cette piste n'est pas traitée avec des bloqueurs, elles reviendront." },
      { q: "Le marc de café est-il efficace ?", a: "C'est un léger répulsif temporel, mais cela ne détruira jamais la reine ou la fourmilière sous-jacente." }
    ],
    actionImmediate: "Ne tuez pas les fourmis éclaireuses avec une simple bombe. Observez leur trajet précis : identifier leur point d'entrée exact sera crucual pour notre technicien !",
    mythesVsRealite: [
      { mythe: "Une seule reine par nid.", realite: "Certaines espèces (comme la fourmi d'Argentine) ont plusieurs dizaines de reines (polygynie), rendant l'éradication classique inefficace." }
    ]
  }
};
