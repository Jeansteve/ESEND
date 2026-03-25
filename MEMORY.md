
### [PSA-2026-03-24-B] : Collision Header & Pitfall justify-center
- **Le Problème :** Titre Hero caché par le Header fixe sur mobile malgré l'ajout de paddings.
- **Cause Racine :** L'utilisation de `justify-center` sur un conteneur flex `h-screen` dense (Titre + Image + CTA). Le navigateur pousse les éléments du haut vers le haut pour centrer le bloc global, causant une collision inévitable avec le Header.
- **La Solution :** Architecture "Top-Down" :
  1. Passer en `justify-start` sur mobile.
  2. Fixer un padding de sécurité (`pt-20`) égal à la hauteur du Header.
  3. Utiliser `flex-grow` sur l'élément central (Image) pour absorber les variations de hauteur d'écran.
- **Règle d'Or (UI Mobile) :** Pour les vues "Above-the-fold" denses avec Header fixe, NE JAMAIS utiliser le centrage automatique (`justify-center`). Privilégier un ancrage par le haut avec compensation de padding.
