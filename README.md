# ☠ Die Counter — Twitch Overlay (StreamElements)

Overlay compteur avancé pour **StreamElements**, piloté via commandes Twitch (`!die`, `!rip`) avec animations dynamiques, personnalisation complète et sauvegarde automatique.

---

## 🖼️ Illustration du projet

<p align="center">
  <img src="https://i.imgur.com/qIlqHvC.png" alt="Preview Overlay" width="500"/>
</p>

---

## ⚙️ Installation

1. Aller sur StreamElements  
2. Créer un nouvel overlay  
3. Ajouter un widget **Custom Widget**  
4. Copier/coller les fichiers :

- HTML → contenu de `DieCounter.html` :contentReference[oaicite:0]{index=0}  
- CSS → contenu de `DieCounter.css` :contentReference[oaicite:1]{index=1}  
- JS → contenu de `DieCounter.js` :contentReference[oaicite:2]{index=2}  
- Fields → contenu de `DieCounter.json` :contentReference[oaicite:3]{index=3}  

---

## 🧠 Fonctionnement

### Commandes Twitch

| Commande | Action |
|----------|--------|
| `!die5` | Définit le compteur à 5 |
| `!die+1` | Ajoute 1 |
| `!die-1` | Retire 1 |
| `!diereset` | Reset à 0 |
| `!rip` | Déclenche une animation |

### Permissions

- `!die*` → Mods + Broadcaster uniquement  
- `!rip` → Tous (avec cooldown pour viewers)

---

## 🎨 Personnalisation

### 🔁 Changer l’image (TRÈS IMPORTANT)

👉 Dans le fichier HTML :

```html
<img id="dc-img" src="https://i.imgur.com/ap8emez.png" />
