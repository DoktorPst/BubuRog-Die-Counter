<p align="center">
  <img src="https://i.ibb.co/d4wKphqF/48fa50d5-3f8e-4075-8e83-c1493a33c0ba.png" width="120"/>
</p>

# ☠ Die Counter — Twitch Overlay (StreamElements)

Overlay compteur avancé pour **StreamElements**, piloté via commandes Twitch (`!die`, `!rip`), avec animations dynamiques, personnalisation complète et sauvegarde automatique.

---

## 🖼️ Rendu de l’overlay

<p align="center">
  <img src="https://i.imgur.com/nna0ZDt.png" alt="Overlay Preview" width="500"/>
</p>

---

## ⚙️ Installation

1. Aller sur **StreamElements**
2. Créer un nouvel overlay
3. Ajouter un widget **Custom Widget**
4. Copier/coller les fichiers :

- HTML → `DieCounter.html`
- CSS → `DieCounter.css`
- JS → `DieCounter.js`
- Fields → `DieCounter.json`

---

## 🧠 Fonctionnement réel

### 🎮 Commandes Twitch

| Commande | Effet |
|----------|------|
| `!die5` | Définit le compteur |
| `!die+1` | Ajoute |
| `!die-1` | Retire |
| `!diereset` | Reset |
| `!rip` | Animation |

---

### 🔐 Permissions

- `!die*` → Mods / Broadcaster uniquement  
- `!rip` → Tous (cooldown automatique)

---

## ⚡ Features techniques

### 📊 Compteur persistant
- Sauvegarde via `SE_API.store`
- Recharge automatique
- Override possible via Fields (`deathCount`)

---

### 🎞️ Animations séparées (architecture clé)

#### 🔢 Chiffre (`#dc-num`)
- Pulse (glow dynamique)
- Float
- Flicker
- Glitch
- Heartbeat
- Wave
- Zoom

#### 🖼️ Image (`#dc-img`)
- Float
- Breath
- Pulse
- Glow
- Wobble
- Flicker

➡️ Totalement indépendantes → gros point fort du système

---

### 💀 Animation `!rip`

Deux modes :

- **Shake global** → tout le container bouge
- **Animation ciblée** → uniquement le chiffre

+ cooldown par utilisateur

---

### 🧠 Gestion avancée

- Détection automatique des mods (tags Twitch)
- Cooldown intelligent par user
- Clamp du compteur (0 → 9999)
- Animation reset propre (reflow CSS maîtrisé)

---

## 🎨 Personnalisation

### 🔁 Changer l’image

Dans le HTML :

```html
<img id="dc-img" src="https://i.imgur.com/ap8emez.png" />
