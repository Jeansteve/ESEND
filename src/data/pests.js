export const pests = {
  'punaises-de-lit': {
    title: 'Punaises de lit',
    image: 'images/punaise-sticker.png',
    description: 'Expertise Éradication : Protocole Punaise',
    expertFact: "Propagation ultra-rapide : un seul vêtement contaminé suffit à infester tout votre foyer en quelques semaines.",
    presentation: "La punaise de lit (Cimex lectularius) est un parasite nocturne qui colonise les zones de repos pour se nourrir de sang humain. Discrète et résistante, elle se propage via les bagages et les textiles.\n\nCe nuisible exige une intervention chirurgicale immédiate pour stopper son cycle de reproduction exponentiel et protéger votre santé mentale.",
    faq: [
      { q: "Qu'est-ce exactement qu'une punaise de lit ?", a: "C'est un insecte hématophage de la taille d'un pépin de pomme, fuyant la lumière et se cachant près des zones de sommeil." },
      { q: "Pourquoi apparaissent-elles chez moi ?", a: "Elles sont transportées par l'humain (hôtels, transports, mobilier d'occasion). Ce n'est pas un problème d'hygiène." },
      { q: "Est-ce dangereux pour mes enfants ?", a: "Oui, les piqûres causent des démangeaisons intenses et l'anxiété liée à l'invasion peut gravement perturber le sommeil des plus petits." },
      { q: "Comment les détecter précocement ?", a: "Cherchez des points noirs (excréments) sur les coutures de matelas ou des traces de sang sur les draps au réveil." },
      { q: "Puis-je les traiter moi-même ?", a: "Le taux d'échec est de 95% avec des produits du commerce car les punaises ont développé des résistances chimiques." },
      { q: "Quels sont les risques si je ne fais rien ?", a: "L'infestation devient totale en quelques semaines, rendant le logement insalubre et l'éradication extrêmement coûteuse." },
      { q: "Pourquoi passer par ESEND ?", a: "Nous combinons traitement thermique (vapeur 180°) et produits rémanents pour neutraliser les œufs et les adultes." }
    ],
    actionImmediate: "Isolez vos vêtements dans des sacs étanches et ne changez pas de pièce pour dormir. Appelez ESEND pour un diagnostic pro immédiat.",
    diagnostic: [
      { q: "Avez-vous repéré de petites taches noires sur votre matelas ou sommier ?", options: ["Oui, c'est net", "Non, pas vu"] },
      { q: "Avez-vous des piqûres regroupées en ligne ou en grappe au réveil ?", options: ["Oui, ça gratte fort", "Non"] },
      { q: "Avez-vous vu des insectes vivants bruns/aplatis ou leurs mues ?", options: ["Oui, j'en ai vu", "Non"] }
    ]
  },
  'rats': {
    title: 'Rats & Souris',
    image: 'images/rat-sticker.png',
    description: 'Sécurisation & Éradication',
    expertFact: "Infiltration agile : un rat peut s'introduire chez vous par un trou de la taille d'une pièce de 2€.",
    presentation: "Les rongeurs sont des opportunistes redoutables, capables d'endommager gravement les structures et l'isolation de votre foyer en quête de nourriture.\n\nLeur présence est une menace directe pour l'hygiène (maladies) et la sécurité électrique (risque d'incendies par câbles rongés).",
    faq: [
        { q: "Pourquoi ai-je des rongeurs chez moi ?", a: "Ils cherchent chaleur et nourriture. Ils s'infiltrent via des fissures, passages de tuyauterie ou bas de portes." },
        { q: "Sont-ils dangereux pour mon bébé ?", a: "Oui, car ils souillent les sols et surfaces avec leurs déjections et urines (leptospirose, salmonellose)." },
        { q: "Puis-je utiliser du poison du commerce ?", a: "C'est risqué et souvent inefficace (néophobie des rats). Un expert utilise des appâts de grade professionnel sécurisés." },
        { q: "Comment les détecte-t-on à coup sûr ?", a: "Bruits de grattements nocturnes, odeur d'urine forte et présence d'excréments noirs." },
        { q: "Quels sont les dégâts matériels possibles ?", a: "Fils électriques rongés, destruction de la laine de verre et contamination des stocks alimentaires." }
    ],
    actionImmediate: "Mettez vos aliments sous scellés et identifiez les zones de passage, mais ne touchez à rien. Appelez-nous pour une dératisation sécurisée.",
    mythesVsRealite: [
      { mythe: "Les chats feront fuir les rongeurs.", realite: "Un chat ne chassera pas une colonie entière, et les rats peuvent même s'attaquer aux croquettes du chat." }
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
    description: 'Destruction de nids sécurisée',
    expertFact: "Danger vital : un nid peut abriter plus de 1500 individus. Ne tentez JAMAIS de le détruire seul.",
    presentation: "Les frelons et guêpes sont des insectes sociaux dont la défense territoriale est foudroyante. Un nid non traité à proximité de l'habitation présente un danger vital immédiat.\n\nUne intervention d'expert ESEND est la seule voie garantie pour une destruction sécurisée et foudroyante du nid.",
    faq: [
      { q: "Est-ce dangereux pour un adulte non allergique ?", a: "Oui, au-delà de quelques piqûres, la dose de venin peut provoquer une toxicité organique grave." },
      { q: "Le frelon asiatique est-il agressif ?", a: "Il est surtout persistant. Il peut poursuivre une menace sur plusieurs dizaines de mètres s'il défend son nid." },
      { q: "Puis-je utiliser un jet d'eau ?", a: "Surtout pas ! Vous exciterez la colonie sans la tuer, provoquant une attaque groupée immédiate." },
      { q: "Pourquoi les nids sont-ils énormes en été ?", a: "La ponte est continue et les ouvrières agrandissent sans cesse la structure pour loger les larves." },
      { q: "Que faire du nid après traitement ?", a: "Rien. Le produit continue d'agir pendant quelques jours sur les derniers individus revenant de l'extérieur." }
    ],
    actionImmediate: "Établissez un périmètre de sécurité et fermez les fenêtres proches du nid. Contactez ESEND pour une intervention d'urgence.",
    mythesVsRealite: [
      { mythe: "Boucher l'entrée du nid résoudra le problème.", realite: "Ils rongeuront le placo pour sortir à l'intérieur de chez vous, créant une situation de crise." }
    ],
    diagnostic: [
      { q: "Avez-vous repéré un gros nid grisâtre ressemblant à du papier mâché ?", options: ["Oui, je le vois", "Non, juste des va-et-vient"] },
      { q: "Les insectes sont-ils nombreux et de grande taille (plus de 2 cm) ?", options: ["Oui, c'est foudroyant", "Non, classiques"] },
      { q: "Le nid est-il situé près de votre maison ou d'un lieu de passage ?", options: ["Oui, très proche", "Non, éloigné"] }
    ]
  },
  'cafards': {
    title: 'Cafards & Blattes',
    image: 'images/cafard-sticker.png',
    description: 'Désinsectisation Rapide & Préventive',
    expertFact: "Vecteurs de maladies : ils contaminent vos surfaces et aliments, favorisant allergies et asthme.",
    presentation: "La blatte est l'un des insectes les plus résistants, capable de survivre dans les conditions les plus extrêmes. Elle souille les environnements sains et propage des bactéries pathogènes.\n\nSon éradication demande un protocole de chaine (gels pros) pour atteindre le cœur de la colonie cachée.",
    faq: [
      { q: "Est-ce un signe de malpropreté ?", a: "Non. Ils arrivent via des emballages, cartons de livraison ou les gaines techniques des voisins." },
      { q: "Les cafards piquent-ils ?", a: "Non, le danger est bactériologique. Ils transportent des germes (salmonelle, etc.) sur vos plans de travail." },
      { q: "Comment les détecter ?", a: "Fuite rapide à l'allumage de la lumière ou présence d'oothèques (poches d'œufs) marron." },
      { q: "Puis-je utiliser des bombes du commerce ?", a: "L'effet est temporaire et souvent les disperse. Les gels pros ESEND ciblent l'extermination totale." },
      { q: "Combien de temps survivent-ils ?", a: "Plus d'un mois sans nourriture, ce qui rend leur éradication naturelle impossible." }
    ],
    actionImmediate: "Nettoyez vos sols, videz les poubelles et identifiez les zones de chaleur. Appelez-nous pour un traitement foudroyant.",
    mythesVsRealite: [
      { mythe: "La Javel fera fuir les cafards.", realite: "Au contraire, certaines espèces peuvent être attirées par les résidus chimiques de certains nettoyants." }
    ],
    diagnostic: [
      { q: "Avez-vous vu des insectes bruns et plats fuir quand vous allumez la lumière ?", options: ["Oui, de nuit surtout", "Non"] },
      { q: "Avez-vous trouvé de minuscules capsules marron (oothèques/œufs) ?", options: ["Oui", "Non"] },
      { q: "L'infestation se situe-t-elle dans une zone humide (cuisine, salle de bain) ?", options: ["Oui, près de points d'eau", "Non"] }
    ]
  },
  'fourmis': {
    title: 'Fourmis (Invasion)',
    image: 'images/fourmi-sticker.png',
    description: 'Identification des pistes & Éradication',
    expertFact: "L'illusion du calme : éliminer les ouvrières isolées ne sert à rien tant que la reine n'est pas neutralisée.",
    presentation: "Les fourmis organisent des autoroutes invisibles vers vos ressources alimentaires. Une infestation installée sous les fondations peut devenir une nuisance permanente.\n\nNeutraliser la piste ne suffit pas : seul l'effondrement de la fourmilière principale garantit un foyer sain.",
    faq: [
      { q: "Sont-elles dangereuses pour ma maison ?", a: "Les espèces charpentières peuvent dégrader le bois. Les autres sont un risque d'hygiène alimentaire." },
      { q: "Le marc de café fonctionne-t-il ?", a: "C'est un répulsif de quelques heures. Cela ne détruira jamais la fourmilière." },
      { q: "Pourquoi reviennent-elles ?", a: "Elles suivent des traces phéromonales. Seul un produit pro peut rompre ce cycle." },
      { q: "Pourquoi faire appel à ESEND ?", a: "Nous utilisons des micro-appâts que les fourmis transportent elles-mêmes jusqu'à la reine." }
    ],
    actionImmediate: "Identifiez leur point d'entrée et ne pulvérisez pas de bombe classique qui ne ferait que les disperser. Appelez un expert.",
    mythesVsRealite: [
      { mythe: "Une seule reine par nid.", realite: "Certaines espèces ont plusieurs reines, rendant l'éradication DIY quasi impossible." }
    ],
    diagnostic: [
      { q: "Observez-vous des files régulières et organisées de fourmis ?", options: ["Oui, une vraie route", "Non, isolées"] },
      { q: "Ont-elles atteint vos provisions alimentaires ou points d'eau ?", options: ["Oui, dans les placards/éviers", "Non, au sol"] },
      { q: "Voyez-vous des montagnes de terre fine le long des plinthes ou carrelages ?", options: ["Oui", "Non"] }
    ]
  }
};
