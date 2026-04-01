export const pests = {
  'punaises-de-lit': {
    title: 'Punaises de lit',
    image: 'images/punaise-sticker.png',
    description: 'Biologie & Comportement',
    expertFact: "Propagation ultra-rapide : un seul vêtement contaminé suffit à infester tout votre foyer en quelques semaines.",
    presentation: "La punaise de lit (Cimex lectularius) est un parasite nocturne qui colonise les zones de repos pour se nourrir exclusivement de sang humain. Très résistante, elle peut survivre plusieurs mois sans nourriture dans un état de dormance. \n\nIndétectable le jour, elle se cache dans les fentes de murs ou la structure du lit. Son cycle de reproduction est foudroyant : une femelle pond en moyenne 5 à 10 œufs par jour, soit près de 500 dans sa vie, ce qui rend la détection précoce indispensable avant une invasion totale.",
    faq: [
      { q: "Qu'est-ce exactement qu'une punaise de lit ?", a: "C'est un insecte hématophage de la taille d'un pépin de pomme, fuyant la lumière et se cachant près des zones de sommeil." },
      { q: "Pourquoi apparaissent-elles chez moi ?", a: "Elles sont transportées par l'humain (hôtels, transports, mobilier d'occasion). Ce n'est pas un problème d'hygiène." },
      { q: "Est-ce dangereux pour mes enfants ?", a: "Oui, les piqûres causent des démangeaisons intenses et l'anxiété liée à l'invasion peut gravement perturber le sommeil des plus petits." },
      { q: "Comment les détecter précocement ?", a: "Cherchez des points noirs (excréments) sur les coutures de matelas ou des traces de sang sur les draps au réveil." },
      { q: "Puis-je les traiter moi-même ?", a: "Le taux d'échec est de 95% avec des produits du commerce car les punaises ont développé des résistances chimiques puissantes." },
      { q: "Quels sont les risques si je ne fais rien ?", a: "L'infestation devient totale en quelques semaines, rendant le logement insalubre et l'éradication complexe." },
      { q: "Pourquoi le traitement est technique ?", a: "Il faut combiner choc thermique (vapeur) et produits rémanents pour neutraliser les œufs et les adultes cachés." }
    ],
    actionImmediate: "Isolez vos vêtements dans des sacs étanches et ne changez pas de pièce pour dormir. Un diagnostic pro est recommandé sans attendre.",
    diagnostic: [
      { q: "Avez-vous repéré de petites taches noires sur votre matelas ou sommier ?", options: ["Oui, c'est net", "Non, pas vu"] },
      { q: "Avez-vous des piqûres regroupées en ligne ou en grappe au réveil ?", options: ["Oui, ça gratte fort", "Non"] },
      { q: "Avez-vous vu des insectes vivants bruns/aplatis ou leurs mues ?", options: ["Oui, j'en ai vu", "Non"] }
    ]
  },
  'rats': {
    title: 'Rats & Souris',
    image: 'images/rat-sticker.png',
    description: 'Rongeurs & Espaces Urbains',
    expertFact: "Infiltration agile : un rat peut s'introduire chez vous par un trou de la taille d'une pièce de 2€.",
    presentation: "Les rongeurs commensaux sont des opportunistes dotés d'une intelligence sociale et d'une adaptabilité élevée. Ils s'installent là où ils trouvent chaleur, abri et nourriture. \n\nCapables de ronger des matériaux durs comme le plomb ou le plastique épais, ils utilisent leurs moustaches (vibrisses) pour explorer les environnements sombres. Leur cycle de reproduction est massif : une seule rate peut engendrer jusqu'à 60 descendants par an en conditions favorables.",
    faq: [
        { q: "Pourquoi ai-je des rongeurs chez moi ?", a: "Ils cherchent chaleur et nourriture. Ils s'infiltrrent via des fissures, passages de tuyauterie ou bas de portes." },
        { q: "Sont-ils dangereux pour la santé ?", a: "Oui, car ils souillent les sols et surfaces avec leurs déjections et urines (risques de leptospirose ou salmonellose)." },
        { q: "Puis-je utiliser du poison du commerce ?", a: "C'est risqué et souvent inefficace à cause de la méfiance naturelle des rats envers les nouveaux objets (néophobie)." },
        { q: "Comment les détecte-t-on à coup sûr ?", a: "Bruits de grattements nocturnes, odeur d'urine forte et présence d'excréments noirs caractéristiques." },
        { q: "Quels sont les dégâts matériels possibles ?", a: "Fils électriques rongés (danger d'incendie), destruction de la laine de verre et contamination des stocks alimentaires." }
    ],
    actionImmediate: "Mettez vos aliments sous scellés et identifiez les zones de passage, mais ne touchez à rien pour ne pas les effrayer.",
    mythesVsRealite: [
      { mythe: "Les chats font fuir les rongeurs.", realite: "Un chat ne chassera pas une colonie entière, et les rats peuvent même s'attaquer aux croquettes du chat." }
    ],
    diagnostic: [
      { q: "Entendez-vous des bruits de grattement dans les murs ou plafonds la nuit ?", options: ["Oui, nettement", "Non"] },
      { q: "Avez-vous trouvé des excréments noirs ressemblant à des grains de riz ?", options: ["Oui", "Non"] },
      { q: "Des câbles, plastiques ou emballages alimentaires sont-ils rongés ?", options: ["Oui, j'ai des dégâts", "Non"] }
    ]
  },
  'frelons': {
    title: 'Guêpes & Frelons',
    image: 'frelon-t5.png',
    description: 'Hyménoptères & Nids',
    expertFact: "Danger vital : un nid peut abriter plus de 1500 individus. Ne tentez JAMAIS de le détruire seul.",
    presentation: "Les guêpes et frelons sont des insectes sociaux dont la colonie s'organise autour d'une reine unique dès le printemps. Leur habitat, conçu à base de cellulose mâchée, peut être construit n'importe où : sous une toiture, dans un conduit ou dans le sol. \n\nCes prédateurs jouent un rôle dans la régulation de certains insectes, mais deviennent agressifs s'ils perçoivent une menace près de leur nid. Ils utilisent leurs antennes pour communiquer par phéromones, ce qui leur permet de synchroniser une attaque massive en cas de vibration détectée.",
    faq: [
      { q: "Est-ce dangereux pour un adulte non allergique ?", a: "Oui, au-delà de quelques piqûres, la dose de venin peut provoquer une toxicité organique grave." },
      { q: "Le frelon asiatique est-il agressif ?", a: "Il est surtout persistant. Il peut poursuivre une menace sur plusieurs dizaines de mètres s'il défend son nid." },
      { q: "Puis-je utiliser un jet d'eau ?", a: "Surtout pas ! Vous exciterez la colonie sans la tuer, provoquant une attaque groupée immédiate." },
      { q: "Pourquoi les nids sont-ils énormes en été ?", a: "La ponte est continue et les ouvrières agrandissent sans cesse la structure pour loger les larves." },
      { q: "Que faire du nid après traitement ?", a: "Rien. Le produit continue d'agir pendant quelques jours sur les derniers individus revenant de l'extérieur." }
    ],
    actionImmediate: "Établissez un périmètre de sécurité et fermez les fenêtres proches du nid. Éloignez les enfants et animaux.",
    mythesVsRealite: [
      { mythe: "Boucher l'entrée du nid résoudra le problème.", realite: "Non, ils peuvent ronger des matériaux comme le placo pour sortir à l'intérieur de chez vous." }
    ],
    diagnostic: [
      { q: "Avez-vous repéré un gros nid grisâtre ressemblant à du papier mâché ?", options: ["Oui, je le vois", "Non, juste des va-et-vient"] },
      { q: "Les insectes sont-ils nombreux et de grande taille (plus de 2 cm) ?", options: ["Oui, c'est impressionnant", "Non, classiques"] },
      { q: "Le nid est-il situé près de votre maison ou d'un lieu de passage ?", options: ["Oui, très proche", "Non, éloigné"] }
    ]
  },
  'cafards': {
    title: 'Cafards & Blattes',
    image: 'images/cafard-sticker.png',
    description: 'Entomologie Urbaine',
    expertFact: "Vecteurs de maladies : ils contaminent vos surfaces et aliments, favorisant allergies et asthme.",
    presentation: "La blatte est l'un des insectes les plus anciens et résistants sur Terre. Capable de survivre plusieurs semaines sans eau et plus d'un mois sans nourriture, elle fuit la lumière et colonise les zones sombres et humides (éviers, moteurs de frigo). \n\nElles laissent derrière elles des phéromones d'agrégation qui attirent d'autres individus. Porteurs de bactéries dans leurs intestins, ils souillent les environnements sains et peuvent déclencher des allergies respiratoires via leurs déjections et mues.",
    faq: [
      { q: "Est-ce un signe de malpropreté ?", a: "Non. Ils arrivent par des emballages, colis de livraison ou conduits techniques depuis le voisinage." },
      { q: "Les cafards piquent-ils ?", a: "Non, le danger est bactériologique. Ils transportent des germes (salmonelle, etc.) sur vos plans de travail." },
      { q: "Comment les détecter ?", a: "Fuite rapide à l'allumage de la lumière ou présence d'oothèques (poches d'œufs) marron." },
      { q: "Puis-je utiliser des bombes du commerce ?", a: "L'effet est très limité et a tendance à les disperser. Un traitement par gel appât est souvent nécessaire." },
      { q: "Combien de temps survivent-ils ?", a: "Plus d'un mois sans nourriture, ce qui rend leur éradication naturelle impossible." }
    ],
    actionImmediate: "Nettoyez vos sols, videz les poubelles et identifiez les zones de chaleur. Ne pas utiliser de Javel.",
    mythesVsRealite: [
      { mythe: "La Javel fait fuir les cafards.", realite: "Au contraire, certaines espèces peuvent être attirées par les résidus chimiques de certains nettoyants." }
    ],
    diagnostic: [
      { q: "Avez-vous vu des insectes bruns et plats fuir quand vous allumez la lumière ?", options: ["Oui, de nuit surtout", "Non"] },
      { q: "Avez-vous trouvé de minuscules capsules marron (oothèques/œufs) ?", options: ["Oui", "Non"] },
      { q: "L'infestation se situe-t-elle dans une zone humide (cuisine, salle de bain) ?", options: ["Oui, près de points d'eau", "Non"] }
    ]
  },
  'fourmis': {
    title: 'Fourmis',
    image: 'images/fourmi-sticker.png',
    description: 'Vie Sociale & Colonies',
    expertFact: "L'illusion du calme : éliminer les ouvrières isolées ne sert à rien tant que la reine n'est pas neutralisée.",
    presentation: "Les fourmis sont des maîtres de l'organisation. Elles utilisent des pistes chimiques invisibles pour guider la colonie vers les ressources alimentaires détectées par les 'fourmis éclaireuses'. \n\nInstallées dans les fondations ou sous les dallages, elles sont capables de transporter des charges pesant plusieurs fois leur poids. La survie de la colonie dépend exclusivement de la reine, protégée en profondeur. Tant que cette dernière est vivante, la fourmilière continuera de se régénérer indépendamment des individus tués à l'extérieur.",
    faq: [
      { q: "Sont-elles dangereuses pour ma maison ?", a: "Les espèces charpentières peuvent dégrader le bois. Les autres posent surtout un problème d'hygiène alimentaire." },
      { q: "Le marc de café fonctionne-t-il ?", a: "C'est un répulsif temporaire de quelques heures. Cela ne détruira jamais la fourmilière principale." },
      { q: "Pourquoi reviennent-elles ?", a: "Elles suivent des traces phéromonales. Seul un produit ciblé peut rompre ce cycle de recrutement." },
      { q: "Comment les éradiquer ?", a: "Il faut utiliser des micro-appâts que les fourmis transportent elles-mêmes jusqu'à la reine pour stopper le nid à la source." }
    ],
    actionImmediate: "Identifiez leur point d'entrée et ne pulvérisez pas de bombe classique qui ne ferait que les disperser.",
    mythesVsRealite: [
      { mythe: "Une seule reine par nid.", realite: "Certaines espèces ont plusieurs reines (polygynie), rendant leur élimination quasi impossible sans aide technique." }
    ],
    diagnostic: [
      { q: "Observez-vous des files régulières et organisées de fourmis ?", options: ["Oui, une vraie route", "Non, isolées"] },
      { q: "Ont-elles atteint vos provisions alimentaires ou points d'eau ?", options: ["Oui, dans les placards/éviers", "Non, au sol"] },
      { q: "Voyez-vous des montagnes de terre fine le long des plinthes ou carrelages ?", options: ["Oui", "Non"] }
    ]
  }
};
