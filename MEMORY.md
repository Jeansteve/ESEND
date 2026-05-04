
### [PSA-2026-03-24-B] : Collision Header & Pitfall justify-center
- **Le Problème :** Titre Hero caché par le Header fixe sur mobile malgré l'ajout de paddings.
- **Cause Racine :** L'utilisation de `justify-center` sur un conteneur flex `h-screen` dense (Titre + Image + CTA). Le navigateur pousse les éléments du haut vers le haut pour centrer le bloc global, causant une collision inévitable avec le Header.
- **La Solution :** Architecture "Top-Down" :
  1. Passer en `justify-start` sur mobile.
  2. Fixer un padding de sécurité (`pt-20`) égal à la hauteur du Header.
  3. Utiliser `flex-grow` sur l'élément central (Image) pour absorber les variations de hauteur d'écran.
- **Règle d'Or (UI Mobile) :** Pour les vues "Above-the-fold" denses avec Header fixe, NE JAMAIS utiliser le centrage automatique (`justify-center`). Privilégier un ancrage par le haut avec compensation de padding.

### [PSA-2026-04-01-A] : Découplage Backdrop-Filter (Nested Blurs)
- **Le Problème :** Le menu déroulant devenait opaque ou perdait son flou lors du défilement.
- **Cause Racine :** Les navigateurs WebKit/Blink peinent à gérer un `backdrop-filter` imbriqué dans un autre parent possédant déjà un flou (le Header fixe après scroll).
- **La Solution :** Découpler le Header :
  1. Utiliser un conteneur `header` sans couleur ni flou.
  2. Ajouter une `div` absolue `inset-0` pour le fond flou du Header (géré par l'opacité au scroll).
  3. Le dropdown, dès lors, n'est plus "héritier" d'un filtre imbriqué, ce qui résout le bug visuel.

### [PSA-2026-04-01-B] : Architecture Hubs Expertise (Standardisation)
- **Concept :** Transformation des pages services en "Encyclopédies Tactiques" autonomes.
- **Structure Standard :** Hero > Protocoles (Bento) > Mythes vs Réalité > Journal de l'Expert > FAQ > CTA Devis.
- **Lien avec FormWizard :** Le bouton devis doit pointer vers `/#devis` avec un hash listener pour garantir l'ouverture immédiate du wizard, même en navigation inter-page.

### [PSA-2026-04-17-A] : Synchronisation Globale & Exclusion Éthique
- **Règle métier :** La liste des nuisibles traités par ESEND est strictement limitée à : Cafard, Guêpes/Frelons, Punaises de lit, Puces, Rats, Souris et Fourmis.
- **Exclusion :** Les **Abeilles** ne sont PAS traitées (protection des pollinisateurs). L'option doit être absente de tout sélecteur ou formulaire.
- **Impact Contenu :** Toute modification de la liste des nuisibles doit être répercutée sur `FormWizard.jsx`, `PestSelector.jsx`, `src/data/pests.js` et les témoignages clients.

### [PSA-2026-04-17-B] : Persistance du Fond Blanc Wizard (Anti-Dark Mode)
- **Le Problème :** Sur un site hybride (clair/sombre), le formulaire "Demander une Intervention" perdait sa lisibilité quand le fond restait blanc mais que les labels devenaient blancs (Classes `dark:`).
- **La Solution :** Forcer le fond blanc pur (`bg-white`) et les textes sombres (`text-slate-900`) en supprimant les classes conditionnelles `dark:`. Le formulaire devient une zone "sanctuarisée" hors-thème pour garantir la conversion.

### [PSA-2026-04-17-C] : Animations Premium Staggered (TrustBanner)
- **Concept :** Pour un rendu haut de gamme, les effets visuels ne doivent pas se déclencher en simultané.
- **Implémentation :** Utilisation d'un `staggered delay` sur les animations de sweep (balayage lumineux). Par exemple, un `animationDelay: (index * 0.4)s` crée une vague de reflets perçue comme un mouvement fluide traversant la page.
- **Micro-interactions :** Le tilt 3D magnétique au survol renforce l'aspect "tangible" et premium des cartes de réassurance.

### [PSA-2026-04-19-A] : Standardisation 'Devis Offert' & Réassurance
- **Wording de Conversion :** Le terme "Obtenir mon devis offert" remplace définitivement "Obtenir mon devis". Le mot "Offert" valorise mieux la gratuité que "Gratuit" dans l'univers premium d'ESEND.
- **Trust Signal :** Ajout systématique du sous-titre "Estimation offerte sans engagement" sous les CTA principaux (Hero, FormWizard). Cela lève le frein psychologique de l'engagement financier immédiat.

### [PSA-2026-04-19-B] : Pattern d'Animation 'Liquid Pulse' (Innovation)
- **Concept :** Pour différencier le bouton de rappel de l'arrière-plan, utilisation d'une aura lumineuse liquide.
- **Technique :** Combinaison de `scale` modéré (1.03) et d'un `boxShadow` en expansion (ex: `0 0 30px 10px rgba(220, 38, 38, 0.2)`).
- **Règle de Clarté :** Pas d'icônes complexes (comme le prix barré) au-dessus du bouton pour éviter de charger l'interface. La réassurance doit rester textuelle et l'animation purement atmosphérique.

### 2. Normes de Conversion & UI
*   **CTA principal** : Utiliser impérativement "Devis Offert" ou "MON DEVIS OFFERT" pour maximiser le taux de clics.
*   **Liquid Pulse** : Animation Framer Motion obligatoire sur les boutons de conversion (aura lumineuse organique).
*   **Bicolore** : Hygiène en Bleu (`sky-400`), Nuisibles en Rouge (`red-600`).
*   **Separateurs de Section** : Utiliser le composant `<SectionSeparator text="..." />` pour les transitions entre blocs majeurs. Bulle centrée, lignes rouges fines de 80px, animation de balayage.

### [PSA-2026-04-20-A] : Animation SVG Séquentielle Complexe (Framer Motion)
- **Le Contexte :** Remplacement d'une séquence complexe d'animation de formulaire (originellement en GSAP lourd) par une implémentation pure `framer-motion` via `<svg>`.
- **Mécanique Morphing :**
  1. Le `<path>` du bouton (`d`) rétrécit avec un timing fluide.
  2. Les éléments intérieurs utilisent explicitement `transformOrigin: "Px Px"` pour éviter des translations erratiques dues au `scale`.
  3. Chaque variante (`idle`, `loading`, `success`) gère ses propres temps d'exécution (`delay`, `duration`) via clé de variante pour permettre un morphing asynchrone parfait sans recourir à JS Timeline.
- **Centrage Dynamique :** Si le texte perd un élément asymétrique à côté de lui, son `x` est modifié dynamiquement lors du changement de state pour préserver le centrage parfait. L'attribut `successGreen` a été fixé à `#16a34a` (Tailwind Green-600) pour un rendu professionnel sans être agressif visuellement.
- **Maintien d'État UI & Finalisation Spectaculaire :** Après l'envoi back-end (FormSubmit), l'état `isSuccess` est maintenu pendant 1.5 seconde. Cela donne à l'utilisateur le frisson visuel de voir le bouton se transformer, valider, rougir (ou verdir), et s'épanouir. Ensuite SEULEMENT, `isSubmitted` passe à `true` et le formulaire cède sa place au bel écran "Demande Envoyée" ! Un vrai parcours sans friction.

### [PSA-2026-04-26-A] : Stabilisation du Radar IA (Local Storage & Race Condition)
- **Le Problème 1 (Sujets invisibles) :** Le générateur IA fonctionnait, mais les sujets disparaissaient car `api.js` tentait de les sauvegarder sur `topics.php` (inexistant sur le serveur Hostinger), provoquant une erreur 404 bloquante.
- **La Solution 1 :** Remplacement de la persistance serveur par du `localStorage` (`esend_ai_topics_v1`) pour les idées générées. Plus d'erreur réseau, affichage instantané.
- **Le Problème 2 (Auto-Start cassé) :** Le clic depuis le Market Advisor ouvrait le Studio, mais la sélection se remettait à zéro sans lancer la recherche.
- **Cause Racine :** Un "Race Condition". Le `useEffect` de l'auto-start s'exécutait *pendant* que le Studio chargeait la base locale. Dès que le chargement se terminait, React détruisait et recréait le composant `TopicChoiceScreen` (perte d'état).
- **La Solution 2 :** 
  1. Forcer la valeur du `<select>` en `String` pour assurer le matching React.
  2. Ajouter `!loadingFromDb` dans les conditions du `useEffect` pour s'assurer que le composant est stable et la DB locale chargée *avant* de lancer la génération IA.
### [PSA-2026-05-02-A] : Correction du Nesting JSX (Balise P Orpheline)
- **Le Problème :** Échec du build de production (`esbuild`) avec l'erreur `Unexpected closing "motion.div" tag does not match opening "p" tag`.
- **Cause Racine :** Une balise `<p>` dans l'étape `urgency` n'était pas fermée correctement, ce qui corrompait la pile d'analyse syntaxique du compilateur lors du traitement des blocs conditionnels React.
- **La Solution :** Fermeture explicite de la balise `<p>` et réalignement des blocs de conditions `{... && (...)}`.
- **Règle d'Or (Codebase) :** Toujours vérifier l'équilibre des balises HTML au sein des rendus conditionnels complexes, car une erreur au milieu du fichier peut être signalée par le compilateur à la toute fin, rendant le debug complexe.

### [PSA-2026-05-02-B] : Réalignement Structurel du Wizard (Balise Div Orpheline)
- **Le Problème :** Deuxième erreur de build consécutive : `Unexpected closing "motion.div" tag does not match opening "div" tag`.
- **Cause Racine :** Une balise `<div>` restait ouverte après le `textarea` de l'étape `details`, empiétant sur la section `photos` et décalant la pile de fermeture des composants parents.
- **La Solution :** Ajout de la fermeture `</div>` manquante et ré-indexation visuelle des niveaux d'imbrication pour garantir un équilibre parfait du DOM.
- **Impact :** Stabilisation totale du pipeline CI/CD sur GitHub Actions. Le build de production est désormais fluide et sans erreurs structurelles.

### [PSA-2026-05-03-A] : Norme 'Glass-Contrast' (Lisibilité sur Glassmorphism)
- **Le Problème :** Textes gris (`slate-500`) ou rouges sombres (`#A72422`) illisibles sur fond flou (effet "washed out").
- **Cause Racine :** Le flou gaussien et la saturation variable de l'arrière-plan absorbent les couleurs sombres peu contrastées.
- **La Solution :** 
  1. Remplacer `slate-500` par `text-white/70` ou `text-white/80` (le blanc "brille" à travers le flou).
  2. Forcer les titres en blanc pur avec `drop-shadow-xl`.
  3. Pour les états actifs "Urgents", abandonner le fond clair opaque pour un fond de couleur vive translucide (`bg-red-600/30`) avec texte blanc.
- **Règle d'Or (UI Premium) :** Sur un fond Glassmorphism, la lisibilité se gagne par l'opacité du blanc et la force des ombres portées, jamais par des couleurs sombres.
### [PSA-2026-05-04-A] : Conformité Légale & RGPD Dynamique
- **Le Concept :** Centralisation totale des informations juridiques (SIRET, Adresse, Gérant) dans le système de paramètres pour garantir une mise en conformité "zéro-code" pour l'administrateur.
- **Implémentation Technique :** 
  1. Création de `LegalNotices.jsx` et `PrivacyPolicy.jsx` utilisant exclusivement `api.getSettings()`.
  2. Injection du SIRET dynamique dans le `Footer.jsx` avec liens de navigation explicites.
  3. Intégration d'un verrou de consentement obligatoire (`checkbox`) dans le `FormWizard.jsx`.
- **Règle d'Or (Conformité) :** Toute collecte de données personnelles (Formulaire) DOIT être précédée d'une case à cocher explicite non-précochée, liée à une politique de confidentialité accessible en un clic. L'adresse physique doit être paramétrable pour refléter la réalité juridique de l'entreprise sans intervention technique.
