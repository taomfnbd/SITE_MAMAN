# Contexte du Projet : Site Floureto Ferigoule (CMS React)

Ce projet est un site vitrine pour un cabinet de thérapie manuelle, développé avec **React + Vite**.
Il intègre un **CMS "Headless" maison** qui permet à l'administrateur de modifier le contenu (textes, images, listes) directement sur le site.

## État Actuel

### 1. Architecture CMS
*   **Frontend :** Les données sont gérées par `CMSContext.jsx`.
*   **Backend :** Connecté à **Supabase** pour la persistance des données.
    *   Table `site_content` : Contenu statique des pages (via `SectionManager`).
    *   Table `articles` : Contenu dynamique (Stages, Blog, Actualités, Liens, Livres).
*   **Authentification :**
    *   Simplifiée à la demande de l'utilisateur.
    *   Mot de passe unique : `filt`.
    *   Géré côté client dans `AdminLogin.jsx`.
    *   Les politiques RLS Supabase sont actuellement en `public` pour permettre l'écriture sans token utilisateur Supabase (car on utilise le client anonyme avec le mot de passe simple).

### 2. Fonctionnalités Récemment Implémentées
*   **Pages CMS :** Toutes les pages (Accueil, Ateliers, Formations, etc.) sont connectées au CMS.
*   **Ateliers :** Gestion complète (Ajout/Suppression/Modif) avec support de pièces jointes (stockées en Data URL, limité à ~4Mo).
*   **Formations :** Texte entièrement éditable via `EditableText`.
*   **Images :** Système d'upload d'image corrigé (utilise un Portal pour éviter les problèmes de z-index/clipping).
*   **Design :**
    *   Menu déroulant corrigé (ne déborde plus).
    *   Page d'accueil : Ajout bouton "Réserver", suppression tagline.

### 3. Déploiement
*   Le projet est prêt pour **Netlify**.
*   Fichier `public/_redirects` présent pour le routing SPA.
*   Variables d'environnement dans `.env` (Supabase URL & Key).
*   Le dépôt Git est initialisé localement.

## Tâches Restantes / À Faire
*   **Déploiement effectif :** Pousser sur GitHub et connecter à Netlify (à faire par l'utilisateur).
*   **Améliorations futures possibles :**
    *   Migrer le stockage des fichiers (PDF Ateliers, Images) vers **Supabase Storage** (actuellement en Base64 dans le JSON, ce qui est lourd).
    *   Renforcer la sécurité RLS si besoin.

## Instructions pour l'IA suivante
Le code est structuré dans `src/`. Les composants CMS sont dans `src/cms/`.
**Contrainte importante :** Ne pas modifier le design visuel "public" du site sauf demande explicite. Se concentrer sur les fonctionnalités d'administration et le backend.
