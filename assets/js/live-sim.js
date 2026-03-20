'use strict';

const LiveSim = {
  interval: null,
  listeners: new Set(),

  start() {
    this.interval = setInterval(() => {
      DB.CITIES.forEach(c => {
        c.rain = Math.max(0, +(c.rain + (Math.random()-.45)*1.5).toFixed(1));
        c.temp = Math.max(18, +(c.temp + (Math.random()-.5)*.4).toFixed(1));
        const old = c.risk;
        c.risk = c.rain>20?'high':c.rain>8?'medium':'low';
        if (old !== c.risk) {
          c.alert = c.risk==='high'?'IMD Alert Active':c.risk==='medium'?'Moderate rain':' Clear';
        }
      });
      this.listeners.forEach(fn => fn());
    }, 6000);
  },

  stop() { clearInterval(this.interval); this.listeners.clear(); },
  subscribe(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); },
};

// ═══════════════════════════════════════════════
//  VIEW RENDERERS
// ═══════════════════════════════════════════════

window.LiveSim = LiveSim;
