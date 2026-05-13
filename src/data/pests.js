export const pests = {
  'punaises-de-lit': {
    title: 'Punaises de lit',
    image: '/images/punaise-sticker.webp',
    description: 'Biologie & Comportement',
    expertFact: "Propagation ultra-rapide : un seul vêtement contaminé suffit à infester tout votre foyer en quelques semaines.",
    presentation: "La punaise de lit (Cimex lectularius) est un parasite nocturne qui colonise les zones de repos pour se nourrir exclusivement de sang humain. Très résistante, elle peut survivre plusieurs mois sans nourriture dans un état de dormance. \n\nIndétectable le jour, elle se cache dans les fentes de murs ou la structure du lit. Son cycle de reproduction est foudroyant : une femelle pond en moyenne 5 à 10 œufs par jour, soit près de 500 dans sa vie, ce qui rend la détection précoce indispensable avant une invasion totale.",
    faq: [
      { q: "Qu'est-ce exactement qu'une punaise de lit ?", a: "C'est un insecte hématophage de la taille d'un pépin de pomme, fuyant la lumière et se cachant près des zones de sommeil." },
      { q: "Pourquoi apparaissent-elles chez moi ?", a: "Elles sont transportées par l'humain (hôtels, transports, mobilier d'occasion). Ce n'est pas un problème d'hygiène." },
      { q: "Est-ce dangereux pour mes enfants ?", a: "Oui, les piqûres causent des démangeaisons intenses et l'anxiété liée à l'invasion peut gravement perturber le sommeil des plus petits." },
      { q: "Comment les détecter précocement ?", a: "Cherchez des points noirs (excréments) sur les coutures de matelas ou des traces de sang sur les draps au réveil." },
      { q: "Puis-je les traiter moi-même ?", a: "Le taux d'échec est de 95% avec des produits du commerce car les punaises ont développé des résistances chimiques puissantes." },
      { q: "Le froid peut-il les tuer ?", a: "Oui, mais il faut une température constante de -20°C pendant plusieurs jours, ce qu'un congélateur domestique permet rarement." },
      { q: "Est-ce que les punaises de lit sautent ?", a: "Non, elles ne sautent pas et ne volent pas. Elles ne font que ramper, mais très rapidement (environ 1 mètre par minute)." },
      { q: "La détection canine est-elle un gadget ?", a: "Au contraire, c'est la méthode la plus fiable (95% de réussite) pour localiser les nids précis sans tout démonter." },
      { q: "Quelle est l'odeur d'une infestation ?", a: "Une infestation massive dégage une odeur douçâtre, souvent comparée à de la coriandre pourrie ou à des amandes amères." },
      { q: "Transmettent-elles des maladies ?", a: "Non, aucune transmission virale n'a été prouvée, mais elles causent des dermatites sévères et une détresse psychologique réelle." }
    ],
    actionImmediate: "Isolez vos vêtements dans des sacs étanches et ne changez pas de pièce pour dormir. Un diagnostic pro est recommandé sans attendre.",
    mythesVsRealite: [
      { mythe: "Elles ne vivent que dans les maisons sales.", realite: "Elles sont attirées par le sang, pas la saleté. Les hôtels 5 étoiles sont autant touchés que les autres." },
      { mythe: "Jeter son matelas règle le problème.", realite: "Elles se cachent aussi dans les plinthes et les prises. Vous risquez d'infester le reste de l'immeuble durant le transport du matelas." },
      { mythe: "Elles sont invisibles à l'œil nu.", realite: "Une punaise adulte a la taille d'un pépin de pomme et est parfaitement visible si l'on sait où chercher." }
    ],
    diagnostic: [
      { q: "Avez-vous repéré de petites taches noires sur votre matelas ou sommier ?", options: ["Oui, c'est net", "Non, pas vu"] },
      { q: "Avez-vous des piqûres regroupées en ligne ou en grappe au réveil ?", options: ["Oui, ça gratte fort", "Non"] },
      { q: "Avez-vous vu des insectes vivants bruns/aplatis ou leurs mues ?", options: ["Oui, j'en ai vu", "Non"] }
    ]
  },
  'rats': {
    title: 'Rats & Souris',
    image: '/images/rat-sticker.webp',
    description: 'Rongeurs & Espaces Urbains',
    expertFact: "Infiltration agile : un rat peut s'introduire chez vous par un trou de la taille d'une pièce de 2€.",
    presentation: "Les rongeurs commensaux sont des opportunistes dotés d'une intelligence sociale et d'une adaptabilité élevée. Ils s'installent là où ils trouvent chaleur, abri et nourriture. \n\nCapables de ronger des matériaux durs comme le plomb ou le plastique épais, ils utilisent leurs moustaches (vibrisses) pour explorer les environnements sombres. Leur cycle de reproduction est massif : une seule rate peut engendrer jusqu'à 60 descendants par an en conditions favorables.",
    faq: [
        { q: "Pourquoi ai-je des rongeurs chez moi ?", a: "Ils cherchent chaleur et nourriture. Ils s'infiltrrent via des fissures, passages de tuyauterie ou bas de portes." },
        { q: "Sont-ils dangereux pour la santé ?", a: "Oui, car ils souillent les sols et surfaces avec leurs déjections et urines (risques de leptospirose ou salmonellose)." },
        { q: "Puis-je utiliser du poison du commerce ?", a: "C'est risqué et inefficace à cause de la méfiance naturelle des rats envers les nouveaux objets (néophobie)." },
        { q: "Comment les détecte-t-on à coup sûr ?", a: "Bruits de grattements nocturnes, odeur d'urine forte et présence d'excréments noirs caractéristiques." },
        { q: "Quels sont les dégâts matériels possibles ?", a: "Fils électriques rongés (danger d'incendie), destruction de la laine de verre et contamination des stocks alimentaires." },
        { q: "Les ultrasons fonctionnent-ils ?", a: "C'est un effet temporaire. Les rongeurs s'y habituent en 48h ou se déplacent simplement dans une pièce non équipée." },
        { q: "Quelle est la différence rat vs souris ?", a: "Le rat est plus gros (20cm), a des oreilles plus petites proportionnellement et des déjections en forme de noyaux d'olives." },
        { q: "Transmettent-ils la rage ?", a: "C'est extrêmement rare en Europe. Le vrai danger vient des bactéries transportées par leurs puces ou leurs urines (leptospirose)." },
        { q: "Sont-ils dangereux pour mes animaux ?", a: "Oui, vos chiens et chats peuvent contracter de graves maladies au contact direct ou via leurs gamelles souillées." },
        { q: "Combien de temps pour créer un nid ?", a: "Ils s'installent durablement en 48h. Une fois que l'odeur du nid est marquée, d'autres individus les rejoignent." }
    ],
    actionImmediate: "Mettez vos aliments sous scellés et identifiez les zones de passage, mais ne touchez à rien pour ne pas les effrayer.",
    mythesVsRealite: [
      { mythe: "Le fromage est le meilleur appât.", realite: "Ils préfèrent le beurre de cacahuète, les céréales ou les aliments riches en protéines." },
      { mythe: "Les rats sont aveugles.", realite: "Leur vue est faible, mais ils compensent par un odorat et une audition exceptionnels permettant de naviguer dans le noir total." },
      { mythe: "Voir un rat signifie qu'il est seul.", realite: "Ce sont des animaux sociaux. En voir un de jour indique souvent une colonie déjà trop nombreuse pour les cachettes habituelles." }
    ],
    diagnostic: [
      { q: "Entendez-vous des bruits de grattement dans les murs ou plafonds la nuit ?", options: ["Oui, nettement", "Non"] },
      { q: "Avez-vous trouvé des excréments noirs ressemblant à des grains de riz ?", options: ["Oui", "Non"] },
      { q: "Des câbles, plastiques ou emballages alimentaires sont-ils rongés ?", options: ["Oui, j'ai des dégâts", "Non"] }
    ]
  },
  'frelons': {
    title: 'Guêpes & Frelons',
    image: '/images/frelon-t5.webp',
    description: 'Hyménoptères & Nids',
    expertFact: "Danger vital : un nid peut abriter plus de 1500 individus. Ne tentez JAMAIS de le détruire seul.",
    presentation: "Les guêpes et frelons sont des insectes sociaux dont la colonie s'organise autour d'une reine unique dès le printemps. Leur habitat, conçu à base de cellulose mâchée, peut être construit n'importe où : sous une toiture, dans un conduit ou dans le sol. \n\nCes prédateurs jouent un rôle dans la régulation de certains insectes, mais deviennent agressifs s'ils perçoivent une menace près de leur nid. Ils utilisent leurs antennes pour communiquer par phéromones, ce qui leur permet de synchroniser une attaque massive en cas de vibration détectée.",
    faq: [
      { q: "Est-ce dangereux pour un adulte non allergique ?", a: "Oui, au-delà de quelques piqûres, la dose de venin peut provoquer une toxicité organique grave." },
      { q: "Le frelon asiatique est-il agressif ?", a: "Il est surtout persistant. Il peut poursuivre une menace sur plusieurs dizaines de mètres s'il défend son nid." },
      { q: "Puis-je utiliser un jet d'eau ?", a: "Surtout pas ! Vous exciterez la colonie sans la tuer, provoquant une attaque groupée immédiate." },
      { q: "Pourquoi les nids sont-ils énormes en été ?", a: "La ponte est continue et les ouvrières agrandissent sans cesse la structure pour loger les larves." },
      { q: "Que faire du nid après traitement ?", a: "Rien. Le produit continue d'agir pendant quelques jours sur les derniers individus revenant de l'extérieur." },
      { q: "Réutilisent-ils leur nid l'année suivante ?", a: "Non, jamais. Le nid est abandonné en fin de saison. Une nouvelle reine reconstruira une structure au printemps suivant." },
      { q: "Que faire si un frelon entre chez moi ?", a: "Ouvrez grand la fenêtre, éteignez la lumière intérieure et allumez l'extérieur. Il cherchera naturellement à sortir vers la lumière." },
      { q: "Les faux nids en papier sont-ils efficaces ?", a: "Cela peut dissuader une reine de s'installer en mars/avril, mais c'est totalement inutile une fois la colonie bien implantée." },
      { q: "Jusqu'à quelle distance attaquent-ils ?", a: "Ils protègent un périmètre de 5 à 10 mètres autour du nid. Si vous courez, ils peuvent vous poursuivre sur 40 mètres." },
      { q: "Comment différencier frelon européen et asiatique ?", a: "L'asiatique a le thorax noir et les pattes jaunes à l'extrémité. L'européen est plus roux et a les pattes foncées." }
    ],
    actionImmediate: "Établissez un périmètre de sécurité et fermez les fenêtres proches du nid. Éloignez les enfants et animaux.",
    mythesVsRealite: [
      { mythe: "Boucher l'entrée du nid suffit.", realite: "Ils peuvent ronger le placo pour sortir à l'intérieur de chez vous par une autre issue." },
      { mythe: "La piqûre de frelon est 7x plus mortelle que l'abeille.", realite: "Sa toxicité est comparable, c'est la quantité de venin injectée et la possibilité de piqûres multiples qui créent le danger." },
      { mythe: "Ils attaquent sans raison.", realite: "L'agressivité est une réaction de défense du nid. Isolé, un individu cherchera presque toujours à fuir." }
    ],
    diagnostic: [
      { q: "Avez-vous repéré un gros nid grisâtre ressemblant à du papier mâché ?", options: ["Oui, je le vois", "Non, juste des va-et-vient"] },
      { q: "Les insectes sont-ils nombreux et de grande taille (plus de 2 cm) ?", options: ["Oui, c'est impressionnant", "Non, classiques"] },
      { q: "Le nid est-il situé près de votre maison ou d'un lieu de passage ?", options: ["Oui, très proche", "Non, éloigné"] }
    ]
  },
  'cafards': {
    title: 'Cafards & Blattes',
    image: '/images/cafard-sticker.webp',
    description: 'Entomologie Urbaine',
    expertFact: "Vecteurs de maladies : ils contaminent vos surfaces et aliments, favorisant allergies et asthme.",
    presentation: "La blatte est l'un des insectes les plus anciens et résistants sur Terre. Capable de survivre plusieurs semaines sans eau et plus d'un mois sans nourriture, elle fuit la lumière et colonise les zones sombres et humides (éviers, moteurs de frigo). \n\nElles laissent derrière elles des phéromones d'agrégation qui attirent d'autres individus. Porteurs de bactéries dans leurs intestins, ils souillent les environnements sains et peuvent déclencher des allergies respiratoires via leurs déjections et mues.",
    faq: [
      { q: "Est-ce un signe de malpropreté ?", a: "Non. Ils arrivent par des emballages, colis de livraison ou conduits techniques depuis le voisinage." },
      { q: "Les cafards piquent-ils ?", a: "Non, le danger est bactériologique. Ils transportent des germes (salmonelle, etc.) sur vos plans de travail." },
      { q: "Comment les détecter ?", a: "Fuite rapide à l'allumage de la lumière ou présence d'oothèques (poches d'œufs) marron." },
      { q: "Puis-je utiliser des bombes du commerce ?", a: "L'effet est très limité et a tendance à les disperser. Un traitement par gel appât est souvent nécessaire." },
      { q: "Combien de temps survivent-ils ?", a: "Plus d'un mois sans nourriture, ce qui rend leur éradication naturelle impossible." },
      { q: "Remontent-ils par les canalisations ?", a: "Oui, c'est l'un de leurs modes de circulation favoris. Ils peuvent même nager sur de courtes distances ou rester en apnée." },
      { q: "Les huiles essentielles fonctionnent-elles ?", a: "Elles ont un effet répulsif minime pour quelques heures, mais n'élimineront jamais une infestation installée au cœur du nid." },
      { q: "Pourquoi sont-ils si durs à tuer ?", a: "Ils possèdent un exosquelette souple capable de résister à une pression 900 fois supérieure à leur propre poids." },
      { q: "Quel est leur aliment préféré ?", a: "Tout aliment riche en amidon, sucre ou fermenté (bière renversée, miettes de pain, restes de pâtes)." },
      { q: "Quel est le signe d'une infestation ancienne ?", a: "Des taches brunes (déjections sèches) sur les gonds des portes de meubles haut ou les charnières de frigos." }
    ],
    actionImmediate: "Nettoyez vos sols, videz les poubelles et identifiez les zones de chaleur. Ne pas utiliser de Javel.",
    mythesVsRealite: [
      { mythe: "Ils survivraient à une explosion nucléaire.", realite: "Ils résistent mieux aux radiations que nous, mais la chaleur intense et le souffle les tuent instantanément comme tout être vivant." },
      { mythe: "Écraser un cafard propage ses œufs.", realite: "C'est rare car les œufs sont dans une capsule solide (oothèque), mais un nettoyage désinfectant reste indispensable." },
      { mythe: "Ils ne sortent que la nuit.", realite: "S'ils sont visibles en plein jour, c'est le signe d'une infestation majeure et d'un manque de place dans le nid." }
    ],
    diagnostic: [
      { q: "Avez-vous vu des insectes bruns et plats fuir quand vous allumez la lumière ?", options: ["Oui, de nuit surtout", "Non"] },
      { q: "Avez-vous trouvé de minuscules capsules marron (oothèques/œufs) ?", options: ["Oui", "Non"] },
      { q: "L'infestation se situe-t-elle dans une zone humide (cuisine, salle de bain) ?", options: ["Oui, près de points d'eau", "Non"] }
    ]
  },
  'fourmis': {
    title: 'Fourmis',
    image: '/images/fourmi-sticker.webp',
    description: 'Vie Sociale & Colonies',
    expertFact: "L'illusion du calme : éliminer les ouvrières isolées ne sert à rien tant que la reine n'est pas neutralisée.",
    presentation: "Les fourmis sont des maîtres de l'organisation. Elles utilisent des pistes chimiques invisibles pour guider la colonie vers les ressources alimentaires détectées par les 'fourmis éclaireuses'. \n\nInstallées dans les fondations ou sous les dallages, elles sont capables de transporter des charges pesant plusieurs fois leur poids. La survie de la colonie dépend exclusivement de la reine, protégée en profondeur. Tant que cette dernière est vivante, la fourmilière continuera de se régénérer indépendamment des individus tués à l'extérieur.",
    faq: [
      { q: "Sont-elles dangereuses pour ma maison ?", a: "Les espèces charpentières peuvent dégrader le bois. Les autres posent surtout un problème d'hygiène alimentaire." },
      { q: "Le marc de café fonctionne-t-il ?", a: "C'est un répulsif temporaire de quelques heures. Cela ne détruira jamais la fourmilière principale." },
      { q: "Pourquoi reviennent-elles ?", a: "Elles suivent des traces phéromonales. Seul un produit ciblé peut rompre ce cycle de recrutement." },
      { q: "Comment les éradiquer ?", a: "Il faut utiliser des micro-appâts que les fourmis transportent elles-mêmes jusqu'à la reine pour stopper le nid à la source." },
      { q: "Pourquoi rentrent-elles dans les prises électriques ?", a: "Elles cherchent une source de chaleur stable et un isolant sec pour y loger une extension du nid principal." },
      { q: "Les pièges collants sont-ils utiles ?", a: "Ils servent uniquement au monitorage (savoir où elles passent) mais ne détruiront jamais le nid en profondeur." },
      { q: "Quelle différence fourmi volante vs termite ?", a: "La fourmi volante a une 'taille de guêpe' et quatre ailes de tailles inégales. Le termite a les ailes égales." },
      { q: "Combien de temps vit une reine ?", a: "Selon l'espèce, une reine peut vivre de 15 à 20 ans, produisant des milliers d'ouvrières en continu." },
      { q: "Le bicarbonate est-il efficace ?", a: "C'est une solution d'appoint de grand-mère qui peut en tuer quelques-unes, mais reste sans effet sur l'éradication totale." },
      { q: "Comment les éradiquer durablement ?", a: "Il faut utiliser des micro-appâts que les fourmis transportent elles-mêmes jusqu'à la reine pour stopper le nid à la source." }
    ],
    actionImmediate: "Identifiez leur point d'entrée et ne pulvérisez pas de bombe classique qui ne ferait que les disperser.",
    mythesVsRealite: [
      { mythe: "Le vinaigre détruit le nid.", realite: "Il brouille les pistes odorantes temporairement, mais la reine continue de pondre en profondeur sans être affectée." },
      { mythe: "L'eau bouillante suffit.", realite: "Elle atteint rarement les galeries profondes où se cache la reine, provoquant juste un déplacement de la fourmilière." },
      { mythe: "Toutes les fourmis sont inoffensives pour le bâti.", realite: "Les fourmis charpentières peuvent affaiblir les structures en bois en y creusant des galeries complexes." }
    ],
    diagnostic: [
      { q: "Observez-vous des files régulières et organisées de fourmis ?", options: ["Oui, une vraie route", "Non, isolées"] },
      { q: "Ont-elles atteint vos provisions alimentaires ou points d'eau ?", options: ["Oui, dans les placards/éviers", "Non, au sol"] },
      { q: "Voyez-vous des montagnes de terre fine le long des plinthes ou carrelages ?", options: ["Oui", "Non"] }
    ]
  },
  'puces': {
    title: 'Puces',
    image: '/images/cafard-sticker.webp', // Placeholder insect
    description: 'Parasites & Animaux',
    expertFact: "Vitesse d'infestation : une seule puce peut pondre jusqu'à 50 œufs par jour, envahissant textiles et parquets en un temps record.",
    presentation: "Les puces sont des parasites externes qui se nourrissent du sang des mammifères. Souvent introduites par les animaux domestiques, elles colonisent rapidement les moquettes, les tapis et les lits. \n\nLeur cycle de vie est complexe : les larves se cachent dans les fibres et les parquets, échappant aux traitements de surface classiques. Elles peuvent rester en dormance pendant plusieurs mois avant d'éclore simultanément lors d'une vibration ou d'une présence humaine, créant une invasion soudaine.",
    faq: [
      { q: "Pourquoi ai-je des puces sans animaux ?", a: "Elles ont pu être apportées par un ancien locataire ou transportées sous vos chaussures depuis un extérieur contaminé." },
      { q: "Est-ce dangereux pour l'humain ?", a: "Oui, les piqûres causent des dermatites allergiques sévères et une détresse psychologique importante." },
      { q: "Le lavage à 30° suffit-il ?", a: "Non, il faut impérativement laver les textiles à 60°C minimum pour détruire les œufs et les larves." },
      { q: "Pourquoi je continue à en voir après traitement ?", a: "C'est normal : le traitement tue les adultes, mais il faut attendre l'éclosion des dernières nymphes." },
      { q: "Puis-je traiter ma maison seul ?", a: "Les fumigènes du commerce ne pénètrent pas assez les tissus. Seul un traitement professionnel par pulvérisation garantit l'éradication." }
    ],
    actionImmediate: "Passez l'aspirateur minutieusement partout et lavez vos draps à 60°C. Ne secouez pas les tapis à l'intérieur.",
    mythesVsRealite: [
      { mythe: "Les puces meurent en hiver.", realite: "À l'intérieur de nos maisons chauffées, elles se reproduisent toute l'année sans interruption." },
      { mythe: "Mon chat n'en a pas, donc le problème n'est pas là.", realite: "95% des puces vivent dans l'environnement (tapis, parquet), pas sur l'animal." },
      { mythe: "Elles ne piquent que la nuit.", realite: "Elles attaquent dès qu'elles détectent une source de chaleur, de jour comme de nuit." }
    ],
    diagnostic: [
      { q: "Avez-vous des piqûres alignées, principalement aux chevilles ?", options: ["Oui, c'est localisé là", "Non"] },
      { q: "Voyez-vous de petits points noirs sauteurs sur vos textiles ?", options: ["Oui, j'en ai vu", "Non"] },
      { q: "Votre animal se gratte-t-il frénétiquement ces derniers temps ?", options: ["Oui, beaucoup", "Non/Pas d'animal"] }
    ]
  }
};
