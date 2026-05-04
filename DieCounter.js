/* ── DIE COUNTER — JS
   Commandes :
     !die5       → fixe à 5
     !die+1      → ajoute 1
     !die-1      → retire 1
     !diereset   → remet à 0
     !rip        → animation (tout le monde, cooldown réglable pour non-mod)
   Permissions :
     !die* : broadcaster + mods
     !rip  : tout le monde (cooldown pour non-mod)
*/
'use strict';

let deaths = 0;
let FD     = {};
const ripCD = {};

const fd    = k => FD[k];
const $     = id => document.getElementById(id);
const clamp = (v,lo,hi) => Math.min(Math.max(v,lo),hi);
const num   = (v,d) => { const n=parseInt(v); return isNaN(n)?d:n; };
const CD_MS = () => num(fd('ripCooldown'), 15) * 60 * 1000;

function isMod(tags) {
  return tags?.broadcaster==='1'
    || tags?.mod==='1'
    || tags?.moderator==='1'
    || (tags?.badges||'').includes('broadcaster')
    || (tags?.badges||'').includes('moderator');
}

/* ── Render ── */
function render() {
  const el = $('dc-num');
  if (el) el.textContent = deaths;
}

/* ── SE Store ── */
function save() {
  try { SE_API.store.set('die_counter', JSON.stringify({ deaths })); } catch(e) {}
}
function load() {
  try {
    SE_API.store.get('die_counter').then(data => {
      if (!data) return;
      deaths = num(JSON.parse(data).deaths, 0);
      // Priorité au réglage manuel si non nul
      const manual = num(fd('deathCount'), -1);
      if (manual >= 0) deaths = manual;
      render();
    });
  } catch(e) {}
}

/* ── Set deaths ── */
function setDeaths(n) {
  deaths = clamp(n, 0, 9999);
  render();
  save();
}

/* ── Animation !rip ── */
function doRip() {
  const wrap = $('dc');
  const n    = $('dc-num');
  const ripAnim = fd('ripAnim') || 'shake';

  if (ripAnim === 'shake') {
    if (!wrap) return;
    wrap.classList.remove('rip');
    void wrap.offsetWidth;
    wrap.classList.add('rip');
    wrap.addEventListener('animationend', () => wrap.classList.remove('rip'), { once: true });
  } else {
    if (!n) return;
    const cls = 'rip-' + ripAnim;
    n.classList.remove(cls);
    void n.offsetWidth;
    n.classList.add(cls);
    n.addEventListener('animationend', () => n.classList.remove(cls), { once: true });
  }
}

/* ── Image passive anim ── */
function applyImgAnim() {
  const img   = $('dc-img'); if (!img) return;
  const anim  = fd('imgAnim')      || 'none';
  const speed = fd('imgAnimSpeed') || 'normal';
  const speedMap = { slow:1.6, normal:1, fast:0.5 };
  const durMap   = { float:4, pulse:2.5, breath:3, wobble:3, flicker:4, glow:2 };
  const mult     = speedMap[speed] || 1;
  const baseDur  = durMap[anim] || 3;
  document.documentElement.style.setProperty('--img-asp', (baseDur * mult).toFixed(2) + 's');
  ['float','pulse','breath','wobble','flicker','glow']
    .forEach(a => img.classList.remove('img-' + a));
  if (anim !== 'none') img.classList.add('img-' + anim);
}

/* ── Apply settings ── */
function applySettings() {
  const imgW  = num(fd('imgSize'),  200);
  const numSz = num(fd('numSize'),  72);
  const col   = fd('numColor')  || '#fae96e';
  const font  = fd('numFont')   || 'Brushlie Demo';
  const offX  = num(fd('offsetX'), 0);
  const offY  = num(fd('offsetY'), -20);

  const img = $('dc-img'), n = $('dc-num');
  const sv = (k,v) => document.documentElement.style.setProperty(k,v);
  if (img) img.style.width = imgW + 'px';
  if (n) {
    n.style.fontSize   = numSz + 'px';
    n.style.color      = col;
    n.style.fontFamily = `'${font}', Impact, Arial Black, sans-serif`;
    // Position via CSS vars : offsetY négatif = monte au-dessus du bas du padding (15px)
    sv('--num-bottom', (15 + (-offY)) + 'px');
    sv('--num-left',   'calc(50% + ' + offX + 'px)');
  }

  document.documentElement.style.setProperty('--gc', fd('glowColor') || '#ff0000');
  const strokeW = parseInt(fd('strokeWidth')) || 3;
  document.documentElement.style.setProperty('--stroke', strokeW + 'px');
  applyPassiveAnim();
  applyImgAnim();

  // Réglage manuel
  const manual = num(fd('deathCount'), -1);
  if (manual >= 0 && manual !== deaths) {
    deaths = manual;
    render();
    save();
  }
}

function applyPassiveAnim() {
  const n     = $('dc-num'); if (!n) return;
  const anim  = fd('passiveAnim') || 'none';
  const speed = fd('animSpeed')   || 'normal';
  const speedMap   = { slow:1.6, normal:1, fast:0.5 };
  const durMap     = { pulse:2.5,float:3,flicker:4,glitch:5,heartbeat:1.5,wave:2,zoom:2.5 };
  const mult       = speedMap[speed] || 1;
  const baseDur    = durMap[anim] || 2.5;
  document.documentElement.style.setProperty('--asp', (baseDur * mult).toFixed(2) + 's');

  ['pulse','float','flicker','glitch','heartbeat','wave','zoom']
    .forEach(a => n.classList.remove('anim-' + a));
  if (anim !== 'none') n.classList.add('anim-' + anim);
}

/* ── SE Listeners ── */
window.addEventListener('onWidgetLoad', function(obj) {
  FD = obj?.detail?.fieldData || {};
  applySettings();
  load();
});

window.addEventListener('onEventReceived', function(obj) {
  if (!obj?.detail) return;
  const { listener, event } = obj.detail;
  if (listener !== 'message' || !event?.data?.text) return;

  const text  = event.data.text.trim();
  const tags  = event.data.tags || event.data;
  const lower = text.toLowerCase();
  const uid   = tags?.userId || tags?.['user-id'] || tags?.username || 'anon';

  /* ── !rip — tout le monde ── */
  if (lower === '!rip') {
    if (isMod(tags)) {
      doRip();
    } else {
      const now  = Date.now();
      const last = ripCD[uid] || 0;
      if (now - last >= CD_MS()) {
        ripCD[uid] = now;
        doRip();
      }
    }
    return;
  }

  /* ── !die* — mods uniquement ── */
  if (!lower.startsWith('!die')) return;
  if (!isMod(tags))              return;

  const arg = lower.slice(4); // tout après "!die"

  if (arg === 'reset') { setDeaths(0); return; }

  // !die+1
  const plus  = arg.match(/^\+(\d+)$/);
  if (plus)  { setDeaths(deaths + parseInt(plus[1])); return; }

  // !die-1
  const minus = arg.match(/^-(\d+)$/);
  if (minus) { setDeaths(deaths - parseInt(minus[1])); return; }

  // !die5 (nombre seul)
  const abs   = arg.match(/^(\d+)$/);
  if (abs)   { setDeaths(parseInt(abs[1])); return; }
});
