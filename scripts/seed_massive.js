

const articlesUrl = 'https://site-test.esendnuisibles.fr/api/articles_v3.php';

const locations = ['Nice', 'Cannes', 'Menton', 'Monaco', 'Antibes', 'la Riviera', 'Grasse', 'Cagnes-sur-Mer', 'Roquebrune-Cap-Martin'];

const generateHtml = (pest, location, problem, cause, stat, solution, result, tips, img) => `
    <h2>Introduction</h2>
    <p>La région de ${location} fait face à une recrudescence préoccupante des infestations de ${pest}. ${problem}</p>
    <img src="${img}" alt="${pest} à ${location}" class="w-full h-auto rounded-xl my-6 shadow-md" style="max-height: 400px; object-fit: cover;" />

    <h2>Les Causes</h2>
    <p>Dans notre région au climat méditerranéen, ${cause}. Les spécificités architecturales et la forte densité urbaine créent un environnement propice à leur développement.</p>
    <blockquote class="border-l-4 border-red-500 pl-4 my-4 italic text-gray-700">
        "Une dynamique inquiétante : ${stat} sur le secteur de ${location}."
    </blockquote>

    <h2>Notre Solution ESEND</h2>
    <p>Face à ce fléau, ESEND déploie un protocole certifié biocides de dernière génération. <strong>${solution}</strong>. Nos techniciens certifiés interviennent avec une approche raisonnée, favorisant l'élimination totale tout en minimisant l'impact écologique.</p>

    <h2>Les Résultats</h2>
    <p>${result}. Nos clients témoignent d'un retour rapide à la normale et d'une tranquillité d'esprit retrouvée. Chaque intervention est couverte par notre garantie constructeur avec visites de contrôle incluses.</p>

    <h2>Prévention — Nos Conseils</h2>
    <ul class="list-disc pl-6 space-y-2 mt-4 text-gray-800">
        ${tips.map(t => `<li>${t}</li>`).join('')}
    </ul>
`;

const articlesData = [
  // --- 1. Dératisation ---
  {
    service_id: 1, pest: "Rats Noirs", location: "Menton", tag: "deratisation", img: "https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6a?q=80&w=1000",
    title: "Invasion de Rats Noirs à Menton : Plan d'Action Esend",
    excerpt: "Comment protéger les toitures et greniers face à la recrudescence des rats noirs.",
    problem: "Ces rongeurs grimpeurs infiltrent les toitures et les combles, détruisant l'isolation et les câbles électriques.",
    cause: "les pins et les toits imbriqués typiques de la ville offrent des voies royales aux rongeurs agiles",
    stat: "Plus de 60% des anciennes bâtisses montrent des signes de passage de rats dans les combles",
    solution: "Nous utilisons un système de piégeage intelligent combiné à des appâts ultra-sécurisés et un colmatage anti-intrusion (Rodenator).",
    result: "Élimination de la colonie en 7 à 10 jours avec une sécurisation complète des accès extérieurs",
    tips: ["Taillez les branches d'arbres touchant la toiture.", "Vérifiez l'étanchéité des tuiles de rive.", "Ne laissez aucune source de nourriture à l'extérieur."]
  },
  {
    service_id: 1, pest: "Souris Domestiques", location: "Cannes", tag: "deratisation", img: "https://images.unsplash.com/photo-1511283910360-64c004f12f6a?q=80&w=1000",
    title: "Combattre les Souris dans les Commerces Cannois",
    excerpt: "Préservez votre réputation et l'hygiène de votre établissement avec nos solutions discrètes.",
    problem: "La présence d'une seule souris peut faire fuir la clientèle et entraîner des fermetures administratives.",
    cause: "le flux constant de marchandises et la proximité des restaurants attirent inexorablement les rongeurs opportunistes",
    stat: "Une souris femelle peut donner naissance à près de 60 souriceaux par an",
    solution: "Mise en place d'un monitoring permanent non-toxique avec boîtes d'appâtage discrètes et suivi numérique.",
    result: "Risque sanitaire neutralisé en un temps record et mise en conformité totale avec la réglementation HACCP",
    tips: ["Stockez les aliments dans des contenants hermétiques rigides.", "Inspectez régulièrement les arrivages de cartons.", "Colmatez le moindre interstice de plus de 5mm."]
  },
  {
    service_id: 1, pest: "Surmulots", location: "Nice", tag: "deratisation", img: "https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?q=80&w=1000",
    title: "Surmulots (Rats d'Égoûts) : Alerte dans le Vieux Nice",
    excerpt: "Face aux rats d'égouts remontant en surface, des méthodes drastiques sont exigées.",
    problem: "Les rats bruns remontent via les réseaux d'assainissement et prolifèrent dans les caves et sous-sols.",
    cause: "la vétusté de certains réseaux souterrains et l'humidité constante favorisent l'installation des nids",
    stat: "Les demandes d'intervention pour surmulots ont augmenté de 35% suite aux récentes fortes pluies",
    solution: "Installation de clapets anti-retour et utilisation de rodonticides inhibiteurs dans des postes sécurisés scellés au sol.",
    result: "Sanitarisation des sous-sols, arrêt total des remontées et neutralisation des odeurs mortuaires",
    tips: ["Faites vérifier vos regards d'égouts et installez des grilles.", "Évitez d'accumuler du débarras dans les caves.", "Signalez toute canalisation cassée."]
  },

  // --- 2. Punaises de Lit ---
  {
    service_id: 2, pest: "Punaises de Lit", location: "Antibes", tag: "punaise-lit", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000",
    title: "Vapeur Sèche vs Punaises de lit à Antibes",
    excerpt: "Découvrez le traitement choc thermique, l'arme absolue contre les puces de lit.",
    problem: "Ces insectes hématophages détruisent vos nuits, provoquant stress intense et lésions cutanées.",
    cause: "le tourisme estival de masse brasse des millions de voyageurs, facilitant le transport des punaises par les bagages",
    stat: "75% des infestations proviennent d'un voyage récent ou d'un séjour hôtelier",
    solution: "Le traitement exclusif par Vapeur Sèche à 180°C qui détruit œufs, larves et adultes sur le coup, sans utiliser de produits toxiques résiduels.",
    result: "Nous sauvons vos matelas et vos nuits immédiatement. Plus aucun risque cutané et un habitat réinvesti le jour même",
    tips: ["Lavez tout linge suspect à 60°C minimum.", "Aspirez minutieusement le sommier et jetez le sac hermétiquement.", "Ne déplacez jamais un meuble infesté dans une autre pièce."]
  },
  {
    service_id: 2, pest: "Punaises de Lit", location: "Monaco", tag: "punaise-lit", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
    title: "Protocole Discrétion Hôtellerie contre les Punaises de lit",
    excerpt: "Notre approche VIP pour les établissements de luxe en Principauté.",
    problem: "Une seule chambre signalée sur les réseaux sociaux peut ruiner la réputation d'un palace prestigieux.",
    cause: "le taux de rotation élevé de la clientèle internationale augmente mathématiquement l'exposition au risque",
    stat: "L'impact économique d'une chambre fermée peut doubler chaque semaine si l'infestation s'étend",
    solution: "Intervention en civil, détection canine pointue et traitement foudroyant combinant froid extrême (Cryogénisation) et vapeur.",
    result: "Remise en location de la chambre en moins de 24h, aucune nuisance olfactive et réputation préservée",
    tips: ["Former les femmes de chambre à la détection des taches noires.", "Utiliser des housses de matelas certifiées hermétiques.", "Isoler immédiatement la literie en cas de suspicion."]
  },
  {
    service_id: 2, pest: "Punaises de Lit", location: "Roquebrune-Cap-Martin", tag: "punaise-lit", img: "https://images.unsplash.com/photo-1628191139360-4083564d03fd?q=80&w=1000",
    title: "L'Erreur Fatale des Bombes Anti-Punaises",
    excerpt: "Pourquoi l'auto-traitement aggrave systématiquement l'infestation de votre logement.",
    problem: "Le recours aux produits de grande surface éparpille les punaises dans toutes les cloisons au lieu de les tuer.",
    cause: "les formules grand public créent un effet répulsif ('flush out') qui fragmente la colonie dans la région méditerranéenne",
    stat: "La résistance chimique des punaises concerne désormais plus de 90% des souches locales",
    solution: "L'Application ciblée d'insecticides professionnels à effet persistant micro-encapsulés complétée par un choc de terre de diatomée.",
    result: "Contrôle total en deux passages espacés de 15 jours. L'infestation est éradiquée là où elle se trouve au lieu d'être repoussée",
    tips: ["N'utilisez jamais d'aérosol fumigène.", "Ne jetez pas votre literie, elle est sauvable.", "Faites appel à ESEND dès le premier bouton suspect."]
  },

  // --- 3. Cafards (Désinsectisation) ---
  {
    service_id: 3, pest: "Blattes Germaniques", location: "Nice", tag: "cafard", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000",
    title: "Cafards dans les Cuisines : Action Immédiate",
    excerpt: "L'éradication foudroyante par gel professionnel pour les restaurants et appartements.",
    problem: "Ces insectes souillent la nourriture, déclenchent l'asthme et se reproduisent à une vitesse ahurissante.",
    cause: "la chaleur constante des cuisines et de l'électroménager est le parfait incubateur pour la blatte germanique",
    stat: "Un couple de blattes peut engendrer jusqu'à 100 000 individus en moins d'un an",
    solution: "Nous appliquons par micro-gouttes un gel attractif neurotoxique (Effet Domino). Le cafard contaminé empoisonnera ses congénères au nid.",
    result: "Foudroyant ! Disparition totale de la colonie en quelques jours sans obligation de vider complètement la cuisine",
    tips: ["Nettoyez scrupuleusement derrière l'électroménager.", "Ne laissez pas d'eau stagner dans l'évier.", "Videz les poubelles tous les jours."]
  },
  {
    service_id: 3, pest: "Blattes Orientales", location: "Grasse", tag: "cafard", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000",
    title: "Invasion Sous-Terraine : La Blatte Orientale",
    excerpt: "Comment se débarrasser des gros cafards noirs qui remontent des caves et garages.",
    problem: "Leur taille imposante effraie et leur provenance des réseaux usés expose à des bactéries nocives.",
    cause: "l'humidité résiduelle des sous-sols de la région attire cette espèce qui a un fort besoin en eau",
    stat: "Plus de 40% des caves de la Riviera sont endémiques à la blatte orientale",
    solution: "Pulvérisation d'un insecticide à très forte rémanence sur les zones de passage, les plinthes et les périmètres extérieurs.",
    result: "Une barrière protectrice infranchissable de longue durée (jusqu'à 6 mois) stoppant net les invasions massives",
    tips: ["Aérez les caves pour réduire l'humidité.", "Scellez le contour des tuyaux de plomberie passants.", "Mettez des moustiquaires aux aérations basses."]
  },
  {
    service_id: 3, pest: "Fourmis Indigènes", location: "la Riviera", tag: "fourmis", img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000",
    title: "Invasion de Fourmis : Couper la Voie",
    excerpt: "Au-delà des simples colonnes, comment détruire le nid central profondément enfoui.",
    problem: "Les fourmis transpercent les joints d'isolation et envahissent les plans de travail dès le printemps.",
    cause: "les chaleurs précoces du bassin méditerranéen stimulent les colonies cherchant un apport sucré rapide",
    stat: "Les phéromones de pistes peuvent rester actives pendant des mois si elles ne sont pas traitées chimiquement",
    solution: "L'utilisation de gels professionnels appâtants contenant un perturbateur de croissance, ramené au couvain pour stériliser la reine.",
    result: "Effondrement total de la fourmilière à la source au lieu de lutter contre des ouvrières remplaçables",
    tips: ["Supprimez l'accès au miel et au sucre (boîtes hermétiques).", "Passez de l'eau vinaigrée sur leur parcours reconnu.", "Ne vaporisez aucun insecticide de contact, cela disperse la colonie."]
  },

  // --- 4. Frelons & Guêpes ---
  {
    service_id: 4, pest: "Frelons Asiatiques", location: "Cagnes-sur-Mer", tag: "frelon", img: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=1000",
    title: "Le Danger du Frelon Asiatique : Intervention d'Urgence",
    excerpt: "Ne prenez aucun risque avec cet insecte destructeur de ruches et menaçant pour l'homme.",
    problem: "Agressif lorsqu'il est approché, ses piqûres multiples peuvent être mortelles pour les personnes sensibles.",
    cause: "la clémence hivernale ne détruit plus les fondatrices, entraînant une multiplication des nids primaires",
    stat: "Un nid de frelons asiatiques peut contenir jusqu'à 3000 individus au cœur de l'été",
    solution: "Intervention en équipement intégral, injection d'une poudre destructrice au cœur du nid grâce à une canule télescopique, puis retrait du nid.",
    result: "La reine et la colonie sont neutralisées instantanément, rendant l'espace extérieur totalement sûr le jour même",
    tips: ["Ne tentez jamais de boucher l'entrée du nid, ils perceront les toitures.", "Évitez tout mouvement brusque à proximité.", "Installez des pièges sélectifs dès Février/Mars."]
  },
  {
    service_id: 4, pest: "Guêpes Communes", location: "Antibes", tag: "guepes", img: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c03?q=80&w=1000",
    title: "Nids de Guêpes sous Tuiles : La Méthode Sûre",
    excerpt: "Comment Esend sécurise vos toitures face aux nids de guêpes invisibles.",
    problem: "Elles gâchent vos repas en extérieur et s'incrustent dans les volets roulants ou les cloisons.",
    cause: "les nombreux interstices des habitations du sud offrent des sites de nidification protégés des intempéries",
    stat: "65% des nids traités nécessitent un travail en hauteur sur des toitures non accessibles",
    solution: "L'application de poudre de pyrèthre naturel à haute pression dans les cavités pour une action ciblée et respectueuse des matériaux.",
    result: "Une intervention sécurisée, sans dégâts pour la toiture, et la disparition des guêpes en quelques heures",
    tips: ["Vérifiez vos coffrages de volets avant l'été.", "Fermez les poubelles extérieures hermétiquement.", "En cas d'attaque, protégez votre tête et éloignez-vous lentement."]
  },
  {
    service_id: 4, pest: "Frelons Européens", location: "Cannes", tag: "frelon", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000",
    title: "Frelon Local : Dénombrer et Gérer Partout",
    excerpt: "Moins féroce que l'asiatique mais très impressionnant, voici le protocole de destruction.",
    problem: "Son bourdonnement sourd et ses vols nocturnes près des lumières sont une véritable source de terreur.",
    cause: "les vieux greniers et troncs creux abondants sur les collines sont leurs lieux de création préférés",
    stat: "Un frelon européen est deux fois plus grand qu'une guêpe classique",
    solution: "Approche crépusculaire utilisant des gaz paralysotoxiques professionnels pulvérisés à même l'orifice de l'essaim.",
    result: "Arrêt immédiat de l'activité du guêpier et retrait physique de la structure cellulosique par nos experts",
    tips: ["Éteignez les lumières extérieures attirant les frelons nocturnes.", "Ne les confondez pas : leur vol est lourd et bruyant.", "Un frelon isolé n'attaque généralement pas s'il n'est pas menacé."]
  },

  // --- 5. Désinfection ---
  {
    service_id: 5, pest: "Micro-organismes", location: "Monaco", tag: "desinfection", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000",
    title: "Désinfection par Nébulisation ULV : La Science",
    excerpt: "L'approche de pointe pour décontaminer efficacement l'air et les surfaces complexes.",
    problem: "Les virus atmosphériques (et biofilms) survivent sur les poignées, climatisations et textiles sans traitement de volume.",
    cause: "la concentration de la population dans les bureaux et commerces fermés accélère la transmission des pathogènes",
    stat: "La nébulisation à froid ULV génère des gouttelettes de 5 à 50 microns qui restent en suspension",
    solution: "Traitement spatial saturant l'air d'un brouillard sec virucide homologué EN14476 garantissant 99.99% de destruction bactérienne et virale.",
    result: "Locaux 100% sécurisés bactériologiquement pour le personnel en moins de 4 heures d'immobilisation",
    tips: ["Planifiez des désinfections mensuelles pour les lieux à fort passage.", "Aérez systématiquement pour renouveler l'oxygène.", "Désinfectez toujours avant la réouverture après un pic épidémique."]
  },
  {
    service_id: 5, pest: "Bactéries Pathogènes", location: "Nice", tag: "syndrome-diogene", img: "https://images.unsplash.com/photo-1583946029363-3d142ce14f17?q=80&w=1000",
    title: "Intervention Extrême : Désinfection Incurie (Diogène)",
    excerpt: "Comment procéder au nettoyage final après un débarras de logement lourdement encombré.",
    problem: "La présence durable de déchets organiques a imprégné les sols et les murs de bactéries fongiques nocives.",
    cause: "le manque de ventilation prolongé d'un habitat fermé favorise l'installation durable des moisissures toxiques",
    stat: "Un logement insalubre mal traité présente un risque pulmonaire sévère pour ses prochains occupants",
    solution: "Lavage bio-chimique profond, pulvérisation de désinfectant moussant industriel suivie d'un traitement à l'Ozone (O3).",
    result: "Élimination des œufs de nuisibles, destruction des spores mortelles et disparition totale des odeurs putrides",
    tips: ["N'entrez pas dans ce type de logement sans équipement respiratoire P3.", "Ne grattez pas les murs moisis à sec.", "Confiez cette étape finale obligatoirement à des professionnels."]
  },
  {
    service_id: 5, pest: "Agents Infectieux", location: "Menton", tag: "desinfection", img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1000",
    title: "Protocoles Médicaux & Santé : Exigence Zero",
    excerpt: "Notre méthodologie rigoureuse pour les cabinets médicaux, dentaires et salles d'attente.",
    problem: "Les agents épidémiologiques sont transmis via les touchers répétés sur le mobilier médical de contact.",
    cause: "le flux ininterrompu de personnes cliniquement malades crée un biotope instable nécessitant une action certifiée",
    stat: "Un bon protocole de surface réduit drastiquement les maladies nosocomiales de proximité",
    solution: "Nettoyage manuel biocleaner vapeur suivi d'une polymérisation de surface par agent protecteur antibactérien.",
    result: "Création d'un bouclier barrière sur les sièges et bureaux prolongeant l'hygiène au-delà du passage",
    tips: ["Priorisez la désinfection des points de contact (poignées, claviers).", "Respectez les temps de pose (contact) des produits.", "Utilisez des matériaux facilement lessivables."]
  },

  // --- 6. Nettoyage Extrême ---
  {
    service_id: 6, pest: "Salissures Lourdes", location: "la Riviera", tag: "nettoyage", img: "https://images.unsplash.com/photo-1581578731548-c64695ce6958?q=80&w=1000",
    title: "Nettoyage Fin de Chantier : Le Choc Visuel",
    excerpt: "L'art de faire disparaître toute trace de laitance, colle et gravats après rénovation.",
    problem: "La poussière fine s'infiltre partout, voilant de blanc les menuiseries et opacifiant les vitrages récents.",
    cause: "les travaux de ponçage et la découpe carrelage génèrent des microparticules particulièrement adhérentes",
    stat: "70% des réclamations clients post-rénovation concernent la qualité du nettoyage initial",
    solution: "Utilisation de machines monobrosses, d'aspirateurs industriels eau/poussière à filtres absolus et de solvants nettoyants écologiques neutralisants.",
    result: "Une remise des clés parfaite, respectant la noblesse des matériaux de votre architecte avec zéro voile blanc",
    tips: ["Exigez le bâchage strict pendant la réalisation.", "Effectuez le nettoyage en descendant (plafond vers sol).", "Faites un second dépoussiérage après 48h (retombée atmosphérique)."]
  },
  {
    service_id: 6, pest: "Tartre & Calcaire", location: "Antibes", tag: "nettoyage", img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000",
    title: "Traitement à l'Eau Pure : L'Efficacité des Vitres",
    excerpt: "Un système révolutionnaire de lavage au moyen de perches en fibres de carbone.",
    problem: "L'air marin combiné au calcium laisse des traces de sels ineffaçables sur les vitres en hauteur.",
    cause: "La combinaison de l'évaporation solaire rapide et les embruns marins calcifient littéralement les baies vitrées de la côte",
    stat: "L'eau pure à 0 ppm ne laisse absolument aucune trace en séchant à l'air libre",
    solution: "Nous projetons une eau totalement déminéralisée par osmose inverse à très haute pression avec un brossage mécanique téléscopique (jusqu'à 15 mètres).",
    result: "Des vitrages, bardages et encadrements nettoyés en simultané en toute sécurité nautique sans nécessiter de nacelle onéreuse",
    tips: ["Intervenez tous les trimestres en bord de mer.", "Évitez le nettoyage de vitres en plein soleil.", "Les panneaux solaires bénéficient grandement de cette méthode (rendement +15%)."]
  },
  {
    service_id: 6, pest: "Graffiti et Sols", location: "Cannes", tag: "nettoyage", img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000",
    title: "Décapage Sol & Encrassement Urbain",
    excerpt: "Comment Esend rend leur aspect neuf aux parkings et façades exposées.",
    problem: "Goudron, traces de pneus, gommes et microalgues altèrent l'aspect de vos résidences touristiques et copropriétés.",
    cause: "la pollution automobile et l'humidité hivernale créent des couches de souillure récalcitrantes aux méthodes simples",
    stat: "Le nettoyage régulier augmente la durée de vie de vos pierres poreuses de 40%",
    solution: "L'hydrosablage écologique basse pression ou l'eau chaude propulsée à très haute pression rotative (cloche de décapage).",
    result: "Une remise à l'état brut sensationnelle redonnant toute la valeur immobilière et le cachet au bâtiment",
    tips: ["Appliquez un traitement hydrofuge après un nettoyage profond poreux.", "Ne nettoyez pas au karcher trop fort pour ne pas creuser les joints.", "Programmez ces travaux avant l'ouverture de la saison estivale."]
  }
];

// Async IIFE to fetch
(async () => {
  let successCount = 0;
  for (const item of articlesData) {
    const htmlContent = generateHtml(item.pest, item.location, item.problem, item.cause, item.stat, item.solution, item.result, item.tips, item.img);
    
    const payload = {
      title: item.title,
      excerpt: item.excerpt,
      image: item.img,
      category: 'Expertise',
      nuisible_tag: item.tag,
      service_id: item.service_id,
      is_published: 1,
      content_html: htmlContent
    };

    try {
      const res = await fetch(articlesUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        successCount++;
        console.log(`[SUCCESS] Published: ${item.title}`);
      } else {
        console.error(`[ERROR] Failed to publish ${item.title}:`, json.error);
      }
    } catch (err) {
      console.error(`[FETCH ERROR] ${item.title}:`, err.message);
    }
    
    // Pause briefly to not overload the API
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log(`\n==============\n🎉 Import Complete: ${successCount}/18 articles published successfully!\n==============\n`);
})();
