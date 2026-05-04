# ☠ Die Counter — Twitch Overlay (StreamElements)

Overlay compteur avancé pour **StreamElements**, contrôlé via commandes Twitch (`!die`, `!rip`), avec animations dynamiques, personnalisation complète et sauvegarde automatique.

---

## 🖼️ Illustration du projet

<p align="center">
  <img src="https://i.imgur.com/Qvq7jSU.png" alt="Preview Overlay" width="500"/>
</p>

---

## ⚙️ Installation

1. Aller sur **StreamElements**
2. Créer un nouvel overlay
3. Ajouter un widget **Custom Widget**
4. Copier/coller les fichiers :

- HTML → contenu de `DieCounter.html`
- CSS → contenu de `DieCounter.css`
- JS → contenu de `DieCounter.js`
- Fields → contenu de `DieCounter.json`

---

## 🧠 Fonctionnement réel du système

### 🎮 Commandes Twitch

| Commande | Effet |
|----------|------|
| `!die5` | Définit le compteur |
| `!die+1` | Incrémente |
| `!die-1` | Décrémente |
| `!diereset` | Reset |
| `!rip` | Déclenche animation |

### 🔐 Permissions

- `!die*` → Mods / Broadcaster uniquement  
- `!rip` → Tout le monde (cooldown configurable)

---

## ⚡ Ce que fait réellement ton code

### 📊 Compteur persistant
- Sauvegarde automatique via `SE_API.store`
- Recharge à l’ouverture de l’overlay
- Priorité au réglage manuel dans les Fields

---

### 🎞️ Animations avancées

#### Sur le chiffre :
- Pulse (glow dynamique)
- Float (flottaison)
- Flicker (scintillement)
- Glitch (instabilité visuelle)
- Heartbeat (battement)
- Wave (oscillation)
- Zoom

#### Sur l’image :
- Float
- Breath
- Pulse
- Glow
- Wobble
- Flicker

➡️ Toutes contrôlables via les Fields (sans modifier le code)

---

### 💀 Animation `!rip`
- Animation globale (shake du container) OU
- Animation spécifique du chiffre
- Cooldown individuel par viewer

---

### 🎯 Système de permissions intelligent
- Détection mods / broadcaster via tags Twitch
- Cooldown uniquement appliqué aux viewers

---

## 🎨 Personnalisation

### 🔁 Changer l’image (IMPORTANT)

Dans le HTML :

```html
<img id="dc-img" src="https://i.imgur.com/ap8emez.png" />
