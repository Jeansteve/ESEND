
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
