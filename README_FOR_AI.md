# Instructions pour l'amélioration du CMS - Site "SITE MAMAN"

Ce document sert de guide pour la prochaine IA ou le développeur qui travaillera sur ce projet. Il décrit l'architecture actuelle, les fonctionnalités du CMS, les corrections récentes et les pistes d'amélioration.

## 1. Stack Technique

*   **Framework** : React 18
*   **Build Tool** : Vite
*   **CSS** : Tailwind CSS
*   **Routing** : React Router DOM (`HashRouter` utilisé pour compatibilité statique/Netlify)
*   **Animations** : Framer Motion
*   **Icônes** : React Icons (principalement Feather Icons)
*   **SEO** : React Helmet Async

## 2. Architecture du CMS

Le CMS est "headless" dans le sens où il n'y a pas de base de données backend traditionnelle. Tout est géré côté client avec une persistance via `localStorage`.

### Composants Clés

*   **`src/cms/CMSContext.jsx`** : Le cœur du CMS. Il gère :
    *   L'état d'édition (`isEditMode`).
    *   L'authentification simulée (`isAuthenticated`).
    *   Les données de contenu (`contentData` stocké en JSON).
    *   La gestion des couleurs personnalisables (`colors`).
    *   La persistance dans `localStorage` (`cms-content`, `cms-colors`, `cms-auth`).
    *   **Note Importante** : Les fonctions `getContent`, `updateContent`, etc., sont mémorisées avec `useCallback` pour éviter des re-renders inutiles.

*   **`src/cms/EditableText.jsx`** : Composant wrapper pour rendre n'importe quel texte éditable.
    *   Utilise `contentEditable`.
    *   Gère les mises à jour via `onBlur`.
    *   Accepte `dangerouslySetInnerHTML` pour le rendu HTML (attention à la sécurité si on passe à un vrai backend).

*   **`src/cms/EditableImage.jsx`** : Composant pour rendre les images éditables (changement de source).

*   **`src/cms/SectionManager.jsx`** : Permet d'ajouter/supprimer/réorganiser des sections de contenu.

*   **`src/cms/CMSToolbar.jsx`** : La barre d'outils flottante pour activer le mode édition, sauvegarder, changer les couleurs, etc.

## 3. Corrections Récentes et Points d'Attention

*   **Navigation (Navbar)** :
    *   Les `z-index` ont été augmentés (`z-[100]`, etc.) pour s'assurer que le menu passe au-dessus des éléments décoratifs ou interactifs des pages.
    *   Les liens ont la classe `cursor-pointer` explicite.
    *   Attention aux conflits potentiels entre `framer-motion` (AnimatePresence) et `react-router-dom` lors des transitions de page.

*   **Performance (Boucle infinie)** :
    *   Un bug causant une boucle infinie de `useEffect` dans `EditableText.jsx` a été corrigé.
    *   Cause : `getContent` dans `CMSContext` changeait à chaque rendu.
    *   Solution : `useCallback` a été ajouté à toutes les fonctions du contexte, et une vérification stricte du contenu a été ajoutée dans `EditableText`.

## 4. Pistes d'Amélioration pour la Prochaine IA

Voici ce qui est demandé pour améliorer le CMS :

1.  **Backend / Persistance Réelle** :
    *   Actuellement, tout est dans le `localStorage` du navigateur de l'utilisateur. Si on change de navigateur, on perd les modifs.
    *   *Suggestion* : Intégrer un backend léger (ex: Supabase, Firebase, ou un système de fichiers JSON via une API Node.js si hébergé) pour sauvegarder `contentData` de manière centralisée.

2.  **Gestion des Images** :
    *   Actuellement, on ne peut probablement que changer l'URL de l'image.
    *   *Suggestion* : Ajouter un véritable upload d'image (vers Cloudinary, Supabase Storage, ou dossier local si c'est un site statique généré).

3.  **Sécurité** :
    *   L'authentification est purement front-end (`localStorage`). N'importe qui avec des connaissances techniques peut contourner cela.
    *   *Suggestion* : Mettre en place une vraie authentification (JWT, Session) si un backend est ajouté.

4.  **Interface Éditeur** :
    *   Améliorer l'UX de l'édition (ex: éditeur riche pour le texte avec gras/italique, sélecteur de couleur plus avancé).

5.  **SEO** :
    *   Vérifier que les balises `meta` sont bien dynamiques et éditables via le CMS pour chaque page.

Bonne chance pour la suite du développement !
