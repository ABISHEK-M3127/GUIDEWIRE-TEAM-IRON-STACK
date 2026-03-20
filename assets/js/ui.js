'use strict';

const UI = {
  toast(msg, type='info', duration=3500) {
    const icons = {success:'✅',error:'❌',info:'ℹ️',warning:'⚠️'};
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
    document.getElementById('toastArea').appendChild(t);
    setTimeout(() => t.remove(), duration);
  },

  modal(title, sub, bodyHtml, actions) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalSub').textContent = sub;
    document.getElementById('modalBody').innerHTML = bodyHtml;
    const acts = document.getElementById('modalActions');
    acts.innerHTML = '';
    actions.forEach(a => {
      const b = document.createElement('button');
      b.className = a.cls || 'btn-secondary';
      b.textContent = a.label;
      b.onclick = () => { a.fn(); this.closeModal(); };
      acts.appendChild(b);
    });
    document.getElementById('modalOverlay').classList.remove('hidden');
  },

  closeModal() {
    document.getElementById('modalOverlay').classList.add('hidden');
  },

  setLoading(btnEl, loading, text='Loading…') {
    if (loading) {
      btnEl.disabled = true;
      btnEl.dataset.origText = btnEl.innerHTML;
      btnEl.innerHTML = `<span class="loader-ring" style="width:18px;height:18px;border-width:2px;"></span> ${text}`;
    } else {
      btnEl.disabled = false;
      btnEl.innerHTML = btnEl.dataset.origText;
    }
  },

  badge(text, type) {
    const map = {green:'bg',yellow:'by',red:'br',blue:'bb',orange:'bo',purple:'bp'};
    return `<span class="badge ${map[type]||'bb'}">${text}</span>`;
  },

  avatar(name) {
    return name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
  },

  avatarBg: ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f97316','#84cc16'],

  riskBadge(r) {
    if(r==='High'||r==='high') return this.badge('High','red');
    if(r==='Medium'||r==='medium') return this.badge('Medium','yellow');
    return this.badge('Low','green');
  },

  planBadge(p) {
    if(p==='premium') return this.badge('Premium','purple');
    if(p==='standard') return this.badge('Standard','blue');
    return this.badge('Simple','green');
  },

  progressBar(pct, color='var(--accent)') {
    return `<div class="prog-wrap"><div class="prog-fill" style="width:${pct}%;background:${color};"></div></div>`;
  },

  ratioBar(pct) {
    const c = pct>60?'var(--red)':pct>30?'var(--yellow)':'var(--green)';
    return `<div class="ratio-bar"><div class="ratio-fill" style="width:${pct}%;background:${c};"></div></div>`;
  },

  show(id) { document.getElementById(id)?.classList.remove('hidden'); },
  hide(id) { document.getElementById(id)?.classList.add('hidden'); },
};

// ═══════════════════════════════════════════════
//  REAL-TIME SIMULATION ENGINE
// ═══════════════════════════════════════════════

window.UI = UI;
