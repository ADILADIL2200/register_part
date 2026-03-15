# Système de Design Professionnel - Guide Complet

## 📋 Vue d'ensemble

Ce document décrit le système de styling professionnel et structuré mis en place pour le projet d'authentification.

## 📁 Structure des fichiers CSS

```
src/
├── index.css              # Styles globaux et système de design
├── App.css                # Styles spécifiques aux formulaires
├── styles/
│   ├── dashboard.css      # Styles du dashboard
│   └── utilities.css      # Classes utilitaires et animations
```

## 🎨 Système de Couleurs

Le système utilise une palette de couleurs cohérente définie comme variables CSS :

### Couleurs Primaires

- **Primaire** : `#4f46e5` (Indigo)
- **Primaire Foncé** : `#4338ca`
- **Primaire Clair** : `#e0e7ff`

### Couleurs de Feedback

- **Succès** : `#10b981` (Vert)
- **Erreur** : `#ef4444` (Rouge)
- **Avertissement** : `#f59e0b` (Orange)
- **Info** : `#3b82f6` (Bleu)

### Couleurs Neutres

- **Texte Principal** : `#1f2937`
- **Texte Secondaire** : `#6b7280`
- **Bordures** : `#e5e7eb`
- **Fond** : `#f9fafb`

## 📐 Système d'Espacement

Variables d'espacement disponibles :

```css
--spacing-xs: 0.25rem --spacing-sm: 0.5rem --spacing-md: 1rem
  --spacing-lg: 1.5rem --spacing-xl: 2rem --spacing-2xl: 3rem;
```

## 🔮 Classes de Formulaires Principales

### Structure de Formulaire

```html
<div class="page-wrapper">
  <div class="page-container">
    <div class="form-card">
      <div class="form-header">
        <div class="header-icon"><!-- SVG --></div>
        <h2>Titre</h2>
        <p>Description</p>
      </div>
      <!-- Formulaire -->
    </div>
  </div>
</div>
```

### Groupe de Formulaire

```html
<div class="form-group">
  <label htmlFor="field">Label</label>
  <input id="field" type="text" />
</div>
```

### Grille de Formulaire

```html
<div class="form-row two-col">
  <div class="form-group"><!-- Champ 1 --></div>
  <div class="form-group"><!-- Champ 2 --></div>
</div>
```

## 🔘 Boutons

### Bouton Primaire

```html
<button class="btn btn-primary">Action Primaire</button>
```

### Bouton Secondaire

```html
<button class="btn btn-secondary">Action Secondaire</button>
```

### Bouton avec Icône

```html
<button class="btn btn-primary">
  <svg><!-- Icône --></svg>
  Texte
</button>
```

### Bouton en Chargement

```html
<button class="btn btn-primary loading">
  <span class="spinner"></span>
  Traitement en cours...
</button>
```

## ⚠️ Alertes et Messages

### Alert Success

```html
<div class="alert alert-success">Message de succès</div>
```

### Alert Error

```html
<div class="alert alert-error">Message d'erreur</div>
```

### Alert Warning

```html
<div class="alert alert-warning">Message d'avertissement</div>
```

### Alert Info

```html
<div class="alert alert-info">Message informatif</div>
```

## 📊 Dashboard - Classes et Structures

### Header Dashboard

```html
<div class="dashboard-header">
  <h1>Titre</h1>
  <div class="dashboard-header-actions">
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

### Grille de Cartes

```html
<div class="dashboard-grid">
  <div class="dashboard-card">
    <div class="dashboard-card-header">
      <h3 class="dashboard-card-title">Titre</h3>
      <div class="dashboard-card-icon"><!-- Icône --></div>
    </div>
    <div class="dashboard-card-value">100</div>
    <div class="dashboard-card-label">Étiquette</div>
  </div>
</div>
```

### Sidebar Navigation

```html
<div class="sidebar">
  <div class="sidebar-header">
    <h2 class="sidebar-title">Menu</h2>
  </div>
  <ul class="sidebar-menu">
    <li class="sidebar-menu-item">
      <a href="#" class="sidebar-menu-link active">
        <svg class="sidebar-menu-icon"><!-- Icône --></svg>
        Lien Actif
      </a>
    </li>
  </ul>
</div>
```

### Tableau Professionnel

```html
<table class="professional-table">
  <thead>
    <tr>
      <th>Colonne 1</th>
      <th>Colonne 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Données 1</td>
      <td>Données 2</td>
    </tr>
  </tbody>
</table>
```

### Badges

```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-danger">Danger</span>
<span class="badge badge-info">Info</span>
```

## ✨ Classes Utilitaires

### Flexbox

```html
<div class="flex flex-center gap-3">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div class="flex flex-between">
  <span>Gauche</span>
  <span>Droite</span>
</div>
```

### Grid

```html
<div class="grid grid-cols-3 gap-4">
  <div>Colonne 1</div>
  <div>Colonne 2</div>
  <div>Colonne 3</div>
</div>
```

### Texte

```html
<p class="text-lg font-bold text-primary">Texte Formaté</p>
<p class="text-sm text-gray">Texte secondaire</p>
```

### Couleurs

```html
<div class="text-primary">Texte primaire</div>
<div class="bg-primary">Fond primaire</div>
<div class="text-success">Texte succès</div>
```

### Espacement

```html
<div class="mb-4">Marge basse</div>
<div class="mt-2">Marge haute</div>
<div class="space-y-4">
  <div>Élément 1</div>
  <div>Élément 2</div>
</div>
```

## 🎬 Animations

### Animations Disponibles

```css
.animate-fadeIn        /* Apparition en fondu */
.animate-slideInUp     /* Entrée du bas */
.animate-slideInDown   /* Entrée du haut */
.animate-slideInLeft   /* Entrée de la gauche */
.animate-slideInRight  /* Entrée de la droite */
.animate-scaleIn       /* Agrandissement */
.animate-pulse         /* Pulsation */
```

### Utilisation

```html
<div class="animate-fadeIn">Contenu avec animation</div>
<div class="animate-slideInUp">Contenu avec effet de glissement</div>
```

## 📱 Responsive Design

Le système supporte les breakpoints suivants :

### Mobile First (par défaut)

- `< 640px` : Mobile
- `640px - 1024px` : Tablet
- `> 1024px` : Desktop

### Classes Responsive

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <div>Responsive Grid</div>
</div>

<div class="hidden sm:block">Visible à partir de 640px</div>
<div class="lg:hidden">Caché à partir de 1024px</div>
```

## 🚀 Bonnes Pratiques

### 1. Structure de Formulaire Standard

```jsx
<div className="page-wrapper">
  <div className="page-container">
    <div className="form-card">
      <div className="form-header">
        <div className="header-icon">{/* SVG */}</div>
        <h2>Titre du Formulaire</h2>
        <p>Description courte</p>
      </div>

      {message && <div className="alert alert-error">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-row two-col">
          <div className="form-group">
            <label>Champ 1</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Champ 2</label>
            <input type="text" />
          </div>
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Traitement..." : "Soumettre"}
        </button>
      </form>
    </div>
  </div>
</div>
```

### 2. Variables CSS Personnalisées

Pour customiser les couleurs globalement, modifiez les variables CSS dans `index.css` :

```css
:root {
  --color-primary: #4f46e5;
  /* ... autres variables ... */
}
```

### 3. Composants Dashboard

Importez toujours `dashboard.css` dans les pages dashboard :

```jsx
import "../styles/dashboard.css";
```

### 4. Utilisation des Utilities

Combinez les classes utilitaires pour obtenir le style souhaité :

```html
<div class="flex flex-between items-center gap-4 p-4 bg-light rounded shadow">
  <h3 class="text-lg font-bold text-primary">Titre</h3>
  <button class="btn btn-primary btn-sm">Action</button>
</div>
```

## 🎯 Checklist de Style pour Nouveau Formulaire

- [ ] Envelopper dans `.page-wrapper`
- [ ] Conteneur `.page-container`
- [ ] Carte `.form-card`
- [ ] En-tête avec `.form-header` et `.header-icon`
- [ ] Gestion des messages d'erreur avec `.alert`
- [ ] Groupes de champs `.form-group`
- [ ] Grille `.form-row` pour les champs multiples
- [ ] Bouton `.btn btn-primary`
- [ ] État de chargement sur bouton

## 📞 Besoin d'Aide?

- Consultez les fichiers CSS pour voir tous les styles disponibles
- Utilisez les classes utilitaires pour construire rapidement
- Adaptez les couleurs via les variables CSS
- Testez la réactivité sur mobile

---

**Version** : 1.0  
**Date de Mise à Jour** : 2024
