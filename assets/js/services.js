'use strict';

const DataSvc = {
  delay: (ms=300) => new Promise(r => setTimeout(r, ms)),

  async getWorkerStats(userId) {
    await this.delay();
    const u = DB.USERS.find(u => u.id === userId);
    const plan = DB.PLANS[u.plan];
    const payouts = DB.PAYOUTS.filter(p => p.user_id === userId);
    const total_received = payouts.filter(p=>p.status==='credited'||p.status==='processing').reduce((a,b)=>a+(b.amount||0),0);
    return {user:u, plan, total_received,
      weekly_cap_used:300, weekly_cap_total:plan.cap_normal,
      ncr_wallet:u.ncr_wallet, weeks:u.weeks, claims:u.claims};
  },

  async getPlanDetails(planKey) {
    await this.delay(100);
    return DB.PLANS[planKey] || null;
  },

  async getCities() {
    await this.delay(200);
    return [...DB.CITIES];
  },

  async getPayouts(userId) {
    await this.delay();
    return DB.PAYOUTS.filter(p => p.user_id === userId);
  },

  async getAdminStats() {
    await this.delay();
    const workers = DB.WORKERS.length + 1239;
    return {
      total_workers: workers,
      revenue_week: 62350,
      claims_pending: 384,
      fraud_flags: DB.FRAUD_QUEUE.length,
      loss_ratios: DB.CITIES.map(c=>({name:c.name,rate:c.claim_rate})),
    };
  },

  async getWorkerList() {
    await this.delay();
    return [...DB.WORKERS];
  },

  async getFraudQueue() {
    await this.delay();
    return [...DB.FRAUD_QUEUE];
  },

  async getTriggers() {
    await this.delay(100);
    return [...DB.TRIGGER_EVENTS];
  },

  async changePlan(userId, newPlan) {
    await this.delay(800);
    const user = DB.USERS.find(u => u.id === userId);
    if (user) {
      user.plan = newPlan;
      Auth.user.plan = newPlan;
    }
    return {success:true, plan: DB.PLANS[newPlan]};
  },

  async updateCity(userId, newCity) {
    await this.delay(600);
    const user = DB.USERS.find(u => u.id === userId);
    if (user) { user.city = newCity; Auth.user.city = newCity; }
    return {success:true};
  },

  async resolveFraud(fraudId, action) {
    await this.delay(500);
    const idx = DB.FRAUD_QUEUE.findIndex(f => f.id === fraudId);
    if (idx > -1) DB.FRAUD_QUEUE.splice(idx, 1);
    return {success:true, action};
  },

  async fireTrigger(cityId, eventType) {
    await this.delay(1200);
    const city = DB.CITIES.find(c => c.id === cityId);
    if (!city) return {success:false};
    const affected = city.workers;
    let icon='🌧️', label=eventType;
    if (eventType==='heavy_rain'){icon='🌊';label='Heavy Rain';}
    else if (eventType==='lockdown'){icon='🔒';label='Lockdown';}
    else if (eventType==='heat'){icon='🌡️';label='Extreme Heat';}
    else if (eventType==='cyclone'){icon='🌀';label='Cyclone/Flood';}
    else if (eventType==='downtime'){icon='📵';label='Platform Downtime';}
    else {icon='🌧️';label='Light Rain';}
    DB.TRIGGER_EVENTS.unshift({icon,title:`${label} — ${city.name}`,sub:`Manually triggered · ${affected} workers`,amount:`${icon}`,bg:'rgba(220,38,38,.07)'});
    return {success:true, city:city.name, event:label, affected};
  },
};

// ═══════════════════════════════════════════════
//  UI HELPERS
// ═══════════════════════════════════════════════

window.DataSvc = DataSvc;
