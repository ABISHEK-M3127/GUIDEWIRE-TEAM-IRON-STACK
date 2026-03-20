'use strict';

const Views = {

  // ── WORKER OVERVIEW ──────────────────────────
  async workerOverview() {
    const c = document.getElementById('tabContent');
    c.innerHTML = '<div style="padding:40px;text-align:center;"><div class="loader-ring" style="margin:0 auto;"></div></div>';
    const data = await DataSvc.getWorkerStats('u1');
    const {user,plan,total_received,weekly_cap_used,weekly_cap_total,ncr_wallet} = data;
    const triggers = await DataSvc.getTriggers();
    const cities = await DataSvc.getCities();
    const myCity = cities.find(c=>c.name===user.city)||cities[0];
    const capPct = Math.round(weekly_cap_used/weekly_cap_total*100);
    const loyaltyPct = Math.round(user.weeks/10*100);

    c.innerHTML = `
    <div class="stat-grid fade">
      <div class="stat-card c-blue">
        <div class="stat-label">Weekly Premium</div>
        <div class="stat-value">₹${plan.weekly}</div>
        <div class="stat-sub">${plan.name} Plan · Auto-deducted</div>
      </div>
      <div class="stat-card c-green">
        <div class="stat-label">Earnings Protected</div>
        <div class="stat-value">₹${total_received.toLocaleString()}</div>
        <div class="stat-sub">Total received</div>
        <span class="stat-badge badge-up">+₹300 today</span>
      </div>
      <div class="stat-card c-yellow">
        <div class="stat-label">Weekly Cap Remaining</div>
        <div class="stat-value">₹${(weekly_cap_total-weekly_cap_used).toLocaleString()}</div>
        <div class="stat-sub">of ₹${weekly_cap_total.toLocaleString()} cap</div>
        ${UI.progressBar(capPct,'var(--yellow)')}
      </div>
      <div class="stat-card c-green">
        <div class="stat-label">NCR Wallet</div>
        <div class="stat-value">₹${ncr_wallet}</div>
        <div class="stat-sub">No-claim rewards earned</div>
      </div>
    </div>
    <div class="main-side fade">
      <div class="card">
        <div class="section-head">
          <div class="section-title">📡 Live Trigger Feed</div>
          <span class="section-tag" id="feedCityTag">${user.city}</span>
        </div>
        <div class="feed-wrap" id="triggerFeed">
          ${triggers.map(t=>`
            <div class="feed-item">
              <div class="feed-icon" style="background:${t.bg}">${t.icon}</div>
              <div class="feed-info">
                <div class="feed-title">${t.title}</div>
                <div class="feed-sub">${t.sub}</div>
              </div>
              <div class="feed-amount">${t.amount}</div>
            </div>`).join('')}
        </div>
      </div>
      <div>
        <div class="card" style="margin-bottom:14px;">
          <div class="section-head"><div class="section-title">🌦️ Today's Weather</div></div>
          <div class="weather-row" id="liveWeather">
            <div class="wx-icon">${myCity.rain>20?'🌊':myCity.rain>5?'🌧️':'☀️'}</div>
            <div><div class="wx-label">Rainfall</div><div class="wx-val" id="wxRain">${myCity.rain} mm</div></div>
            <div style="margin-left:auto;text-align:right;"><div class="wx-label">Temperature</div><div class="wx-val" id="wxTemp">${myCity.temp}°C</div></div>
          </div>
          ${myCity.risk==='high'?`
          <div class="alert warn">
            <div class="alert-icon">🌊</div>
            <div class="alert-body"><strong>Heavy Rain Trigger Active</strong>Payout of ₹${plan.payouts.heavy_rain} will be credited within 2 hours.</div>
          </div>`:myCity.risk==='medium'?`
          <div class="alert info">
            <div class="alert-icon">🌧️</div>
            <div class="alert-body"><strong>Light Rain Trigger Active</strong>Payout of ₹${plan.payouts.light_rain} may be credited today.</div>
          </div>`:`
          <div class="alert success">
            <div class="alert-icon">☀️</div>
            <div class="alert-body"><strong>No Active Trigger</strong>No disruptions in your city right now.</div>
          </div>`}
        </div>
        <div class="card">
          <div class="section-title" style="margin-bottom:12px;">🏆 Loyalty Progress</div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:6px;">Week ${user.weeks} of 10 · ${user.claims} claim${user.claims!==1?'s':''} this cycle</div>
          ${UI.progressBar(loyaltyPct,'linear-gradient(90deg,var(--yellow),var(--orange))')}
          <div class="tier-pills">
            <div class="tier-pill">None</div>
            <div class="tier-pill">🥉 Bronze</div>
            <div class="tier-pill ${user.weeks>=6&&user.weeks<10?'t-active':''}">🥈 Silver ${user.weeks>=6&&user.weeks<10?'←':''}</div>
            <div class="tier-pill ${user.weeks>=10?'t-active':''}">🥇 Gold ${user.weeks>=10?'←':''}</div>
          </div>
          <div style="font-size:11px;color:var(--muted);margin-top:10px;">${10-user.weeks} more weeks + ≤1 more claim = Silver bonus (₹${Math.round(DB.PLANS[user.plan].insured*.7).toLocaleString()})</div>
        </div>
      </div>
    </div>
    <div class="card fade">
      <div class="section-head"><div class="section-title">📈 Weekly Payout History</div></div>
      <div style="display:flex;align-items:flex-end;gap:8px;height:80px;">
        ${[{h:33,w:'W1',paid:true},{h:10,w:'W2',paid:false},{h:66,w:'W3',paid:true},{h:50,w:'W4',paid:true},{h:10,w:'W5 NCR',paid:false},{h:88,w:'W6←',paid:true}].map(b=>`
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;">
            <div style="height:${b.h}px;width:100%;background:${b.paid?'linear-gradient(var(--accent),var(--accent2))':'var(--border)'};border-radius:4px 4px 0 0;"></div>
            <div style="font-size:10px;color:var(--muted);margin-top:4px;text-align:center;">${b.w}</div>
          </div>`).join('')}
      </div>
      <div style="display:flex;gap:14px;margin-top:12px;font-size:11px;color:var(--muted);">
        <span>🔵 Payout received</span><span>⬜ No event / NCR earned</span>
      </div>
    </div>`;

    // Subscribe to live updates
    const unsub = LiveSim.subscribe(() => {
      const city = DB.CITIES.find(c=>c.name===Auth.user?.city)||DB.CITIES[0];
      const rain = document.getElementById('wxRain');
      const temp = document.getElementById('wxTemp');
      if(rain) rain.textContent = city.rain+' mm';
      if(temp) temp.textContent = city.temp+'°C';
    });
    c._unsub = unsub;
  },

  // ── WORKER: MY PLAN ──────────────────────────
  async workerPlan() {
    const c = document.getElementById('tabContent');
    c.innerHTML = '<div style="padding:40px;text-align:center;"><div class="loader-ring" style="margin:0 auto;"></div></div>';
    const user = Auth.getUser();
    const currentPlan = DB.PLANS[user.plan];

    c.innerHTML = `
    <div class="plan-grid fade">
      ${Object.entries(DB.PLANS).map(([key,p])=>`
        <div class="plan-card p-${key} ${user.plan===key?'selected-plan':''}">
          <div style="font-family:'Syne',sans-serif;font-size:12px;font-weight:700;color:${key==='simple'?'var(--green)':key==='premium'?'#7c3aed':'var(--accent)'};">
            ${key==='simple'?'🟢':key==='standard'?'🔵':'🟣'} ${p.name.toUpperCase()}
          </div>
          <div class="plan-price">₹${p.weekly}<span style="font-size:14px;font-weight:400;">/week</span></div>
          <div class="plan-period">Insured: ₹${p.insured.toLocaleString()} · Cap: ₹${p.cap_normal.toLocaleString()}/wk</div>
          <hr class="plan-hr">
          <div class="plan-feature">Light rain: ₹${p.payouts.light_rain}</div>
          <div class="plan-feature">Heavy rain: ₹${p.payouts.heavy_rain}</div>
          <div class="plan-feature">Extreme heat: ₹${p.payouts.heat}</div>
          <div class="plan-feature">Lockdown: ₹${p.payouts.lockdown}</div>
          <div class="plan-feature">Platform downtime: ₹${p.payouts.downtime}</div>
          <div class="plan-feature">NCR cashback: ₹${p.ncr}/calm week</div>
          ${user.plan!==key?`<button onclick="Views.upgradePlan('${key}')" class="btn-primary" style="margin-top:14px;font-size:12px;padding:9px;">Switch to ${p.name}</button>`:'<div style="margin-top:14px;font-size:12px;color:var(--accent);font-weight:600;font-family:Syne,sans-serif;">✓ Your current plan</div>'}
        </div>`).join('')}
    </div>
    <div class="two-col fade">
      <div class="card">
        <div class="section-title" style="margin-bottom:14px;">📋 Current Plan Details</div>
        <table class="data-table">
          <tr><td style="color:var(--muted);font-size:12px;">Plan</td><td><strong>${currentPlan.name}</strong></td></tr>
          <tr><td style="color:var(--muted);font-size:12px;">Weekly Premium</td><td>₹${currentPlan.weekly} (auto-deducted Monday)</td></tr>
          <tr><td style="color:var(--muted);font-size:12px;">Insured Amount</td><td>₹${currentPlan.insured.toLocaleString()}</td></tr>
          <tr><td style="color:var(--muted);font-size:12px;">Cap (off-season)</td><td>₹${currentPlan.cap_normal.toLocaleString()}</td></tr>
          <tr><td style="color:var(--muted);font-size:12px;">Cap (monsoon)</td><td>₹${currentPlan.cap_monsoon.toLocaleString()}</td></tr>
          <tr><td style="color:var(--muted);font-size:12px;">City</td><td>${user.city}</td></tr>
          <tr><td style="color:var(--muted);font-size:12px;">KYC Status</td><td>${UI.badge('✓ Verified','green')}</td></tr>
          <tr><td style="color:var(--muted);font-size:12px;">Subscribed weeks</td><td>${user.weeks}</td></tr>
        </table>
      </div>
      <div class="card">
        <div class="section-title" style="margin-bottom:14px;">📊 Payout Table (your plan)</div>
        <table class="data-table">
          <thead><tr><th>Event</th><th>Condition</th><th>Payout</th></tr></thead>
          <tbody>
            <tr><td>🌧️ Light rain</td><td>5–20mm</td><td style="color:var(--accent);font-weight:600;">₹${currentPlan.payouts.light_rain}</td></tr>
            <tr><td>🌊 Heavy rain</td><td>&gt;20mm</td><td style="color:var(--accent);font-weight:600;">₹${currentPlan.payouts.heavy_rain}</td></tr>
            <tr><td>🌡️ Extreme heat</td><td>≥42°C 2h+</td><td style="color:var(--accent);font-weight:600;">₹${currentPlan.payouts.heat}</td></tr>
            <tr><td>🔒 Lockdown</td><td>Gov. order</td><td style="color:var(--accent);font-weight:600;">₹${currentPlan.payouts.lockdown}</td></tr>
            <tr><td>📵 Downtime</td><td>App offline &gt;6h</td><td style="color:var(--accent);font-weight:600;">₹${currentPlan.payouts.downtime}</td></tr>
            <tr><td>🌀 Cyclone/Flood</td><td>IMD warning</td><td style="color:var(--accent);font-weight:600;">₹${currentPlan.payouts.cyclone}</td></tr>
          </tbody>
        </table>
        <div style="margin-top:12px;font-size:12px;color:var(--muted);background:var(--bg);padding:10px 12px;border-radius:8px;border:1px solid var(--border);">
          ⚠️ No-stacking: only the highest single trigger pays per day.
        </div>
      </div>
    </div>`;
  },

  async upgradePlan(newPlan) {
    const plan = DB.PLANS[newPlan];
    UI.modal(
      `Switch to ${plan.name} Plan`,
      `Weekly premium will change to ₹${plan.weekly}. Insured amount: ₹${plan.insured.toLocaleString()}.`,
      `<div class="alert info" style="margin:0;">
        <div class="alert-icon">ℹ️</div>
        <div class="alert-body">New plan takes effect from next Monday. Your current week's coverage remains unchanged.</div>
      </div>`,
      [
        {label:'Cancel', cls:'btn-secondary', fn:()=>{}},
        {label:`Confirm — ₹${plan.weekly}/week`, cls:'btn-primary', fn: async () => {
          UI.toast('Switching plan…','info');
          await DataSvc.changePlan('u1', newPlan);
          UI.toast(`Switched to ${plan.name} plan!`,'success');
          Views.workerPlan();
        }},
      ]
    );
  },

  // ── WORKER: RISK MAP ─────────────────────────
  async workerRisk() {
    const c = document.getElementById('tabContent');
    c.innerHTML = '<div style="padding:40px;text-align:center;"><div class="loader-ring" style="margin:0 auto;"></div></div>';
    const cities = await DataSvc.getCities();
    const user = Auth.getUser();
    const myCity = cities.find(c=>c.name===user.city)||cities[0];
    this._renderRiskContent(cities, myCity);
  },

  _renderRiskContent(cities, myCity) {
    const c = document.getElementById('tabContent');
    const fc = [
      {day:'Fri',rain:myCity.rain,temp:myCity.temp},
      {day:'Sat',rain:+(myCity.rain*1.15).toFixed(1),temp:myCity.temp-0.5},
      {day:'Sun',rain:+(myCity.rain*1.3).toFixed(1),temp:myCity.temp-1},
      {day:'Mon',rain:+(myCity.rain*0.6).toFixed(1),temp:myCity.temp},
      {day:'Tue',rain:+(myCity.rain*0.3).toFixed(1),temp:myCity.temp+0.5},
      {day:'Wed',rain:+(myCity.rain*0.1).toFixed(1),temp:myCity.temp+1},
      {day:'Thu',rain:1,temp:myCity.temp+1.5},
    ];
    const plan = DB.PLANS[Auth.user?.plan||'standard'];

    c.innerHTML = `
    ${myCity.risk==='high'?`
    <div class="alert warn fade" style="margin-bottom:18px;">
      <div class="alert-icon">⚠️</div>
      <div class="alert-body"><strong>Your City Risk Level: HIGH — ${myCity.name}</strong>IMD red alert active. Rainfall ${myCity.rain}mm exceeds 20mm threshold. Payout queued.</div>
    </div>`:''}
    <div class="section-head fade">
      <div class="section-title">🗺️ Real-Time City Risk Monitor</div>
      <span class="section-tag" id="riskUpdated">Updated just now</span>
    </div>
    <div class="city-grid fade" id="cityRiskGrid">
      ${cities.map(city=>`
        <div class="city-card risk-${city.risk} ${city.name===myCity.name?'city-selected':''}" onclick="Views._cityClick('${city.id}')">
          <div class="city-name">${city.name} ${city.name===Auth.user?.city?'📍':''}</div>
          <div class="city-stats">🌧️ <strong id="cr-${city.id}">${city.rain}</strong>mm &nbsp; 🌡️ ${city.temp}°C</div>
          <div style="font-size:11px;color:var(--muted);margin-bottom:8px;">${city.alert}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            ${UI.riskBadge(city.risk)}
            <span style="font-size:11px;color:${city.ncr_paused?'var(--red)':'var(--green)'}">NCR: <strong>${city.ncr_paused?'Paused':'Active'}</strong></span>
          </div>
        </div>`).join('')}
    </div>
    <div class="two-col fade">
      <div class="card">
        <div class="section-title" style="margin-bottom:14px;">🌧️ 7-Day Forecast — ${myCity.name}</div>
        <table class="data-table">
          <thead><tr><th>Day</th><th>Rain (mm)</th><th>Temp</th><th>Risk</th><th>Trigger</th></tr></thead>
          <tbody>
            ${fc.map((d,i)=>{
              const r=d.rain>20?'High':d.rain>8?'Med':'Low';
              const t=d.rain>20?`🌊 Heavy Rain ₹${plan.payouts.heavy_rain}`:d.rain>8?`🌧️ Light Rain ₹${plan.payouts.light_rain}`:'None';
              return `<tr>
                <td>${d.day}${i===0?' <span class="badge bb">Today</span>':''}</td>
                <td>${d.rain}mm</td><td>${d.temp}°C</td>
                <td>${UI.badge(r,r==='High'?'red':r==='Med'?'yellow':'green')}</td>
                <td style="font-size:12px;color:${t==='None'?'var(--muted)':'var(--green)'}">${t}</td>
              </tr>`;}).join('')}
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="section-title" style="margin-bottom:14px;">📡 Live Data Sources</div>
        ${[
          {name:'OpenWeatherMap API',status:true,detail:`${myCity.rain}mm · ${myCity.temp}°C · sync: now`},
          {name:'IMD Alerts Feed',status:true,detail:`${myCity.risk==='high'?'🔴 Red alert':'🟡 Yellow watch'} — ${myCity.name}`},
          {name:'Swiggy / Zomato Status',status:true,detail:'All platforms operational · 99.8%'},
          {name:'MHA / Gov. RSS Feed',status:true,detail:'No lockdown active · 2 min ago'},
        ].map(s=>`
          <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg);border-radius:10px;border:1px solid var(--border);margin-bottom:8px;">
            <div style="width:8px;height:8px;border-radius:50%;background:${s.status?'var(--green)':'var(--red)'};animation:blink 1.5s infinite;flex-shrink:0;"></div>
            <div>
              <div style="font-size:13px;font-weight:500;">${s.name}</div>
              <div style="font-size:11px;color:var(--muted);">${s.detail}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;

    const unsub = LiveSim.subscribe(() => {
      DB.CITIES.forEach(city => {
        const el = document.getElementById(`cr-${city.id}`);
        if(el) el.textContent = city.rain;
        const tag = document.getElementById('riskUpdated');
        if(tag) tag.textContent = 'Updated just now';
      });
    });
    document.getElementById('tabContent')._unsub = unsub;
  },

  _cityClick(cityId) {
    document.querySelectorAll('.city-card').forEach(el=>el.classList.remove('city-selected'));
    event.currentTarget.classList.add('city-selected');
    const city = DB.CITIES.find(c=>c.id===cityId);
    if(city) UI.toast(`Selected: ${city.name} — Risk: ${city.risk.toUpperCase()}`,'info',2000);
  },

  // ── WORKER: PAYOUTS ──────────────────────────
  async workerPayouts() {
    const c = document.getElementById('tabContent');
    c.innerHTML = '<div style="padding:40px;text-align:center;"><div class="loader-ring" style="margin:0 auto;"></div></div>';
    const payouts = await DataSvc.getPayouts('u1');
    const total = payouts.filter(p=>p.status!=='deducted').reduce((a,b)=>a+b.amount,0);
    const premiums = DB.USERS.find(u=>u.id==='u1').weeks * DB.PLANS[Auth.user.plan].weekly;

    c.innerHTML = `
    <div class="stat-grid fade">
      <div class="stat-card c-green"><div class="stat-label">Total Received</div><div class="stat-value">₹${total}</div><div class="stat-sub">Across ${DB.USERS[0].weeks} weeks</div></div>
      <div class="stat-card c-blue"><div class="stat-label">Total Premiums Paid</div><div class="stat-value">₹${premiums}</div><div class="stat-sub">${DB.USERS[0].weeks} × ₹${DB.PLANS[Auth.user.plan].weekly}</div></div>
      <div class="stat-card c-yellow"><div class="stat-label">Return on Premium</div><div class="stat-value">${(total/Math.max(premiums,1)).toFixed(1)}×</div><div class="stat-sub">Payouts ÷ Premiums</div></div>
      <div class="stat-card c-green"><div class="stat-label">NCR Earned</div><div class="stat-value">₹${DB.USERS[0].ncr_wallet}</div><div class="stat-sub">No-claim cashbacks</div></div>
    </div>
    <div class="card fade">
      <div class="section-head">
        <div class="section-title">💳 Payout History</div>
        <span class="section-tag">All transactions</span>
      </div>
      <table class="data-table">
        <thead><tr><th>Date</th><th>Event</th><th>Trigger</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>
          ${payouts.map(p=>`
            <tr>
              <td>${p.date}</td>
              <td>${p.event}</td>
              <td style="font-size:12px;color:var(--muted);">${p.detail}</td>
              <td style="color:var(--green);font-weight:600;">+₹${p.amount}</td>
              <td>${p.status==='credited'?UI.badge('Credited','green'):p.status==='processing'?UI.badge('Processing','yellow'):UI.badge('Deducted','red')}</td>
            </tr>`).join('')}
          <tr>
            <td colspan="3" style="color:var(--muted);font-size:12px;">Premiums paid: ${DB.USERS[0].weeks} × ₹${DB.PLANS[Auth.user.plan].weekly}</td>
            <td style="color:var(--red);font-weight:600;">−₹${premiums}</td>
            <td>${UI.badge('Deducted','red')}</td>
          </tr>
        </tbody>
      </table>
    </div>`;
  },

  // ── WORKER: SETTINGS ─────────────────────────
  async workerSettings() {
    const c = document.getElementById('tabContent');
    const user = Auth.getUser();
    c.innerHTML = `
    <div class="two-col fade">
      <div class="card">
        <div class="section-title" style="margin-bottom:18px;">👤 Profile</div>
        <div class="field"><label>Full Name</label><input id="sName" value="${user.name}"/></div>
        <div class="field"><label>Email</label><input id="sEmail" value="${user.email}" disabled style="opacity:.6;"/></div>
        <div class="field"><label>City</label>
          <select class="form-select" id="sCity">
            ${DB.CITIES.map(ci=>`<option value="${ci.name}" ${ci.name===user.city?'selected':''}>${ci.name}</option>`).join('')}
          </select>
        </div>
        <button class="btn-primary" id="saveProfileBtn" onclick="Views.saveProfile()" style="margin-top:4px;">Save Changes</button>
      </div>
      <div class="card">
        <div class="section-title" style="margin-bottom:18px;">🔔 Notifications</div>
        ${[
          ['Payout alerts (SMS)',true],
          ['Payout alerts (Email)',true],
          ['Weekly forecast',true],
          ['Loyalty tier updates',false],
          ['NCR cashback reminders',true],
        ].map(([label,checked])=>`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);">
            <span style="font-size:13px;">${label}</span>
            <label style="position:relative;width:36px;height:20px;cursor:pointer;">
              <input type="checkbox" ${checked?'checked':''} style="opacity:0;position:absolute;" onchange="Views._toggleNotif(this,'${label}')">
              <div style="position:absolute;inset:0;background:${checked?'var(--accent)':'var(--border)'};border-radius:10px;transition:.2s;" class="notif-bg-${label.replace(/\s/g,'')}"></div>
              <div style="position:absolute;top:2px;left:${checked?'18px':'2px'};width:16px;height:16px;background:#fff;border-radius:50%;transition:.2s;box-shadow:0 1px 3px rgba(0,0,0,.2);"></div>
            </label>
          </div>`).join('')}
        <div style="border-bottom:none;"></div>
      </div>
    </div>
    <div class="card fade">
      <div class="section-title" style="margin-bottom:14px;">🔐 Security</div>
      <div class="form-row">
        <div class="field"><label>Current Password</label><input type="password" placeholder="••••••••"/></div>
        <div class="field"><label>New Password</label><input type="password" placeholder="••••••••"/></div>
      </div>
      <button class="btn-primary" style="width:auto;padding:10px 24px;font-size:13px;" onclick="UI.toast('Password updated successfully','success')">Update Password</button>
    </div>`;
  },

  _toggleNotif(el, label) {
    UI.toast(`${label}: ${el.checked?'enabled':'disabled'}`,'info',2000);
  },

  async saveProfile() {
    const btn = document.getElementById('saveProfileBtn');
    UI.setLoading(btn, true, 'Saving…');
    const newCity = document.getElementById('sCity').value;
    await DataSvc.updateCity('u1', newCity);
    UI.setLoading(btn, false);
    UI.toast('Profile saved successfully!','success');
  },

  // ── ADMIN: OVERVIEW ──────────────────────────
  async adminOverview() {
    const c = document.getElementById('tabContent');
    c.innerHTML = '<div style="padding:40px;text-align:center;"><div class="loader-ring" style="margin:0 auto;"></div></div>';
    const stats = await DataSvc.getAdminStats();
    const triggers = await DataSvc.getTriggers();

    c.innerHTML = `
    <div class="stat-grid fade">
      <div class="stat-card c-blue"><div class="stat-label">Active Workers</div><div class="stat-value">${stats.total_workers.toLocaleString()}</div><div class="stat-sub">Across 6 cities</div><span class="stat-badge badge-up">+83 this week</span></div>
      <div class="stat-card c-green"><div class="stat-label">Revenue (this week)</div><div class="stat-value">₹${(stats.revenue_week/1000).toFixed(0)}K</div><div class="stat-sub">${stats.total_workers} active policies</div></div>
      <div class="stat-card c-yellow"><div class="stat-label">Claims Pending</div><div class="stat-value">${stats.claims_pending}</div><div class="stat-sub">Processing now</div><span class="stat-badge badge-up">+47 from today's rain</span></div>
      <div class="stat-card c-red"><div class="stat-label">Fraud Flags</div><div class="stat-value" id="fraudCount">${stats.fraud_flags}</div><div class="stat-sub">Needs manual review</div></div>
    </div>
    <div class="two-col fade">
      <div class="card">
        <div class="section-head"><div class="section-title">📉 Loss Ratio by City</div><span class="section-tag">Rolling 30 days</span></div>
        ${stats.loss_ratios.map(lr=>`
          <div style="margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
              <span style="font-size:13px;">${lr.name}</span>
              <span style="font-size:13px;font-weight:600;color:${lr.rate>60?'var(--red)':lr.rate>30?'var(--yellow)':'var(--green)'};">${lr.rate}%</span>
            </div>
            ${UI.ratioBar(lr.rate)}
          </div>`).join('')}
      </div>
      <div class="card">
        <div class="section-head"><div class="section-title">⚡ Active Triggers</div><div class="live-badge"><span class="live-dot"></span>Live</div></div>
        ${triggers.map(t=>`
          <div class="feed-item">
            <div class="feed-icon" style="background:${t.bg}">${t.icon}</div>
            <div class="feed-info"><div class="feed-title" style="font-size:12px;">${t.title}</div><div class="feed-sub">${t.sub}</div></div>
          </div>`).join('')}
      </div>
    </div>
    <div class="card fade">
      <div class="section-head"><div class="section-title">🏦 Financial Summary (this week)</div></div>
      <table class="data-table">
        <thead><tr><th>Item</th><th>Amount</th><th>% Revenue</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>Premium Revenue</td><td style="color:var(--green);font-weight:600;">₹62,350</td><td>100%</td><td>${UI.badge('Collected','green')}</td></tr>
          <tr><td>Claims to Pay (est.)</td><td style="color:var(--red);">₹28,700</td><td>46%</td><td>${UI.badge('In Progress','yellow')}</td></tr>
          <tr><td>NCR Cashback (2 cities paused)</td><td style="color:var(--muted);">₹0</td><td>0%</td><td>${UI.badge('Paused','red')}</td></tr>
          <tr><td>Ops/Tech Costs</td><td style="color:var(--muted);">₹7,482</td><td>12%</td><td>${UI.badge('Fixed','blue')}</td></tr>
          <tr><td>Loyalty Reserve (5%)</td><td>₹3,117</td><td>5%</td><td>${UI.badge('Ring-fenced','blue')}</td></tr>
          <tr><td style="font-weight:700;font-family:'Syne',sans-serif;">Projected Net Profit</td><td style="color:var(--green);font-weight:700;font-family:'Syne',sans-serif;">₹23,051</td><td style="color:var(--green);font-weight:700;">~37%</td><td>${UI.badge('Healthy ✓','green')}</td></tr>
        </tbody>
      </table>
    </div>`;
  },

  // ── ADMIN: WORKERS ───────────────────────────
  async adminWorkers() {
    const c = document.getElementById('tabContent');
    c.innerHTML = '<div style="padding:40px;text-align:center;"><div class="loader-ring" style="margin:0 auto;"></div></div>';
    const workers = await DataSvc.getWorkerList();
    const avatarBg = UI.avatarBg;

    c.innerHTML = `
    <div class="card fade">
      <div class="section-head">
        <div class="section-title">👷 Worker Registry</div>
        <div style="display:flex;gap:8px;align-items:center;">
          <input id="workerSearch" placeholder="Search worker…" style="padding:7px 12px;border:1.5px solid var(--border);border-radius:9px;font-size:13px;background:var(--bg);color:var(--text);outline:none;width:200px;" oninput="Views._filterWorkers(this.value)">
          <span class="section-tag">${workers.length} shown</span>
        </div>
      </div>
      <table class="data-table" id="workerTable">
        <thead><tr><th>Worker</th><th>City</th><th>Plan</th><th>Weeks</th><th>Claims</th><th>Risk</th><th>Status</th><th>Action</th></tr></thead>
        <tbody id="workerTbody">
          ${workers.map((w,i)=>`
            <tr data-name="${w.name.toLowerCase()}" data-city="${w.city.toLowerCase()}">
              <td>
                <div style="display:flex;align-items:center;gap:9px;">
                  <div style="width:30px;height:30px;border-radius:50%;background:${avatarBg[i%avatarBg.length]};display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:700;font-size:10px;color:#fff;">${UI.avatar(w.name)}</div>
                  <div><div style="font-size:13px;font-weight:500;">${w.name}</div><div style="font-size:11px;color:var(--muted);">${w.email}</div></div>
                </div>
              </td>
              <td style="font-size:13px;">${w.city}</td>
              <td>${UI.planBadge(w.plan)}</td>
              <td style="font-size:13px;">${w.weeks}</td>
              <td style="font-size:13px;">${w.claims}</td>
              <td>${UI.riskBadge(w.risk)}</td>
              <td>${w.status==='active'?UI.badge('Active','green'):UI.badge('Review','yellow')}</td>
              <td>
                <button class="action-btn ab-blue" onclick="Views._viewWorker('${w.id}','${w.name}','${w.city}','${w.plan}')">View</button>
                ${w.status==='review'?`<button class="action-btn ab-red" style="margin-left:4px;" onclick="Views._suspendWorker('${w.id}','${w.name}')">Hold</button>`:''}
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
  },

  _filterWorkers(q) {
    const rows = document.querySelectorAll('#workerTbody tr');
    rows.forEach(r => {
      const match = r.dataset.name?.includes(q.toLowerCase()) || r.dataset.city?.includes(q.toLowerCase()) || q==='';
      r.style.display = match?'':'none';
    });
  },

  _viewWorker(id, name, city, plan) {
    const p = DB.PLANS[plan];
    UI.modal(
      name,
      `${city} · ${p?.name} Plan`,
      `<table class="data-table" style="margin-top:0;">
        <tr><td style="color:var(--muted);font-size:12px;">Worker ID</td><td>#${id}</td></tr>
        <tr><td style="color:var(--muted);font-size:12px;">Plan</td><td>${p?.name} — ₹${p?.weekly}/week</td></tr>
        <tr><td style="color:var(--muted);font-size:12px;">Insured Amount</td><td>₹${p?.insured?.toLocaleString()}</td></tr>
        <tr><td style="color:var(--muted);font-size:12px;">City</td><td>${city}</td></tr>
      </table>`,
      [{label:'Close', cls:'btn-secondary', fn:()=>{}}]
    );
  },

  _suspendWorker(id, name) {
    UI.modal(
      `Hold Payouts — ${name}`,
      'This will pause automatic payouts pending manual review.',
      `<div class="alert warn" style="margin:0;"><div class="alert-icon">⚠️</div><div class="alert-body">All pending payouts for this worker will be held until manually approved.</div></div>`,
      [
        {label:'Cancel', cls:'btn-secondary', fn:()=>{}},
        {label:'Confirm Hold', cls:'btn-danger', fn:()=>{ UI.toast(`${name}'s payouts held for review.`,'warning'); }},
      ]
    );
  },

  // ── ADMIN: RISK MONITOR ──────────────────────
  async adminRisk() {
    const c = document.getElementById('tabContent');
    c.innerHTML = '<div style="padding:40px;text-align:center;"><div class="loader-ring" style="margin:0 auto;"></div></div>';
    const [cities, fraudQueue] = await Promise.all([DataSvc.getCities(), DataSvc.getFraudQueue()]);

    c.innerHTML = `
    ${cities.filter(ci=>ci.risk==='high').length>0?`
    <div class="alert danger fade" style="margin-bottom:18px;">
      <div class="alert-icon">🔴</div>
      <div class="alert-body"><strong>${cities.filter(ci=>ci.claim_rate>60).length} cities exceed 60% loss ratio — NCR auto-paused</strong>
        Monitoring for reinsurance escalation at 80%.</div>
    </div>`:''}
    <div class="city-grid fade">
      ${cities.map(city=>`
        <div class="city-card risk-${city.risk}">
          <div class="city-name">${city.name}</div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:6px;">👷 ${city.workers} workers · Claim rate: <strong style="color:${city.claim_rate>60?'var(--red)':city.claim_rate>30?'var(--yellow)':'var(--green)'};">${city.claim_rate}%</strong></div>
          ${UI.ratioBar(city.claim_rate)}
          <div style="display:flex;justify-content:space-between;margin-top:10px;">
            ${UI.riskBadge(city.risk)}
            <span style="font-size:11px;color:${city.ncr_paused?'var(--red)':'var(--green)'}">NCR ${city.ncr_paused?'Paused':'Active'}</span>
          </div>
        </div>`).join('')}
    </div>
    <div class="two-col fade">
      <div class="card">
        <div class="section-head"><div class="section-title">🚨 Fraud Alert Queue</div><span class="section-tag" id="fraudQueueCount">${fraudQueue.length} pending</span></div>
        <table class="data-table" id="fraudTable">
          <thead><tr><th>Worker ID</th><th>City</th><th>Signal</th><th>Action</th></tr></thead>
          <tbody id="fraudTbody">
            ${fraudQueue.map(f=>`
              <tr id="fraud-${f.id}">
                <td style="font-weight:600;">${f.worker}</td>
                <td>${f.city}</td>
                <td style="font-size:12px;">${f.signal}</td>
                <td style="display:flex;gap:6px;">
                  <button class="action-btn ab-green" onclick="Views._resolveFraud('${f.id}','approve')">Approve</button>
                  <button class="action-btn ab-red" onclick="Views._resolveFraud('${f.id}','dismiss')">Dismiss</button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="section-title" style="margin-bottom:14px;">📊 NCR Pause Status</div>
        <table class="data-table">
          <thead><tr><th>City</th><th>Claim Rate</th><th>NCR</th></tr></thead>
          <tbody>
            ${cities.map(city=>`
              <tr>
                <td>${city.name}</td>
                <td style="color:${city.claim_rate>60?'var(--red)':city.claim_rate>30?'var(--yellow)':'var(--green)'};font-weight:600;">${city.claim_rate}%</td>
                <td>${city.ncr_paused?UI.badge('Paused','red'):UI.badge('Active','green')}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  },

  async _resolveFraud(id, action) {
    const row = document.getElementById(`fraud-${id}`);
    if(row) { row.style.opacity='.4'; row.style.pointerEvents='none'; }
    await DataSvc.resolveFraud(id, action);
    if(row) row.remove();
    const remaining = document.querySelectorAll('#fraudTbody tr').length;
    const counter = document.getElementById('fraudQueueCount');
    if(counter) counter.textContent = `${remaining} pending`;
    const adminCounter = document.getElementById('fraudCount');
    if(adminCounter) adminCounter.textContent = remaining;
    UI.toast(action==='approve'?'Payout approved and released.':'Case dismissed — payout held.',action==='approve'?'success':'warning');
  },

  // ── ADMIN: PLANS ─────────────────────────────
  async adminPlans() {
    const c = document.getElementById('tabContent');
    c.innerHTML = '<div style="padding:40px;text-align:center;"><div class="loader-ring" style="margin:0 auto;"></div></div>';
    await DataSvc.delay(300);

    c.innerHTML = `
    <div class="stat-grid fade">
      ${[['Simple','389','31%','var(--green)'],['Standard','621','50%','var(--accent)'],['Premium','237','19%','#7c3aed'],['Avg Retention','6.4 wks','–','var(--yellow)']].map(([l,v,s,col])=>`
        <div class="stat-card c-blue">
          <div class="stat-label">${l}</div>
          <div class="stat-value">${v}</div>
          <div class="stat-sub">${s} of base</div>
          ${s!=='–'?`<div style="height:5px;background:var(--border);border-radius:20px;margin-top:8px;overflow:hidden;"><div style="height:100%;width:${s};background:${col};border-radius:20px;"></div></div>`:''}
        </div>`).join('')}
    </div>
    <div class="card fade" style="margin-bottom:18px;">
      <div class="section-head"><div class="section-title">📋 Plan Economics</div></div>
      <table class="data-table">
        <thead><tr><th>Plan</th><th>Users</th><th>Weekly Revenue</th><th>Avg Claim/User</th><th>Loss Ratio</th><th>Margin</th></tr></thead>
        <tbody>
          <tr><td>${UI.badge('🟢 Simple','green')}</td><td>389</td><td style="color:var(--green);">₹9,725</td><td>₹48</td><td><div style="display:flex;align-items:center;gap:8px;">${UI.ratioBar(48)}<span style="font-size:12px;white-space:nowrap;">48%</span></div></td><td style="color:var(--green);font-weight:700;">+38%</td></tr>
          <tr><td>${UI.badge('🔵 Standard','blue')}</td><td>621</td><td style="color:var(--green);">₹31,050</td><td>₹156</td><td><div style="display:flex;align-items:center;gap:8px;">${UI.ratioBar(55)}<span style="font-size:12px;white-space:nowrap;">55%</span></div></td><td style="color:var(--green);font-weight:700;">+33%</td></tr>
          <tr><td>${UI.badge('🟣 Premium','purple')}</td><td>237</td><td style="color:var(--green);">₹21,330</td><td>₹312</td><td><div style="display:flex;align-items:center;gap:8px;">${UI.ratioBar(62)}<span style="font-size:12px;white-space:nowrap;">62%</span></div></td><td style="color:var(--green);font-weight:700;">+26%</td></tr>
        </tbody>
      </table>
    </div>
    <div class="two-col fade">
      <div class="card">
        <div class="section-title" style="margin-bottom:14px;">🏆 Loyalty Tier Distribution</div>
        <table class="data-table">
          <thead><tr><th>Tier</th><th>Workers</th><th>Reserve Liability</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>🥇 Gold (10+ wks, ≤2 claims)</td><td>84</td><td>₹1,26,000</td><td>${UI.badge('Funded','yellow')}</td></tr>
            <tr><td>🥈 Silver (8–10 wks, ≤2 claims)</td><td>129</td><td>₹1,35,450</td><td>${UI.badge('Funded','yellow')}</td></tr>
            <tr><td>🥉 Bronze (6–8 wks, ≤1 claim)</td><td>203</td><td>₹97,440</td><td>${UI.badge('Funded','green')}</td></tr>
            <tr><td>— No tier (&lt;6 wks / 3+ claims)</td><td>831</td><td>₹0</td><td>${UI.badge('N/A','blue')}</td></tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="section-title" style="margin-bottom:14px;">📅 Seasonal Cap Schedule</div>
        <table class="data-table">
          <thead><tr><th>Season</th><th>Standard Cap</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>❄️ Nov–Feb (Dry)</td><td>₹1,200/week</td><td>${UI.badge('Off-season','blue')}</td></tr>
            <tr><td>☀️ Mar–May (Heat)</td><td>₹1,200/week</td><td>${UI.badge('Off-season','blue')}</td></tr>
            <tr><td>🌧️ Jun–Sep (Monsoon)</td><td>₹750/week</td><td>${UI.badge('ACTIVE ←','yellow')}</td></tr>
            <tr><td>🍂 Oct (Transition)</td><td>₹900/week</td><td>${UI.badge('Off-season','blue')}</td></tr>
          </tbody>
        </table>
        <div style="margin-top:12px;font-size:12px;color:var(--muted);padding:10px;background:rgba(217,119,6,.04);border-radius:8px;border:1px solid rgba(217,119,6,.15);">
          🌧️ Monsoon caps active. Per-day payouts unchanged.
        </div>
      </div>
    </div>`;
  },

  // ── ADMIN: TRIGGER SIMULATOR ─────────────────
  async adminTriggers() {
    const c = document.getElementById('tabContent');
    const cities = await DataSvc.getCities();

    c.innerHTML = `
    <div class="two-col fade">
      <div class="card">
        <div class="section-title" style="margin-bottom:18px;">⚡ Fire a Parametric Trigger</div>
        <div class="alert info" style="margin-bottom:18px;">
          <div class="alert-icon">ℹ️</div>
          <div class="alert-body">Simulate a real-world disruption event. The system will evaluate all enrolled workers in the selected city and queue payouts.</div>
        </div>
        <div class="field"><label>City</label>
          <select class="form-select" id="trigCity">
            ${cities.map(ci=>`<option value="${ci.id}">${ci.name} (${ci.workers} workers)</option>`).join('')}
          </select>
        </div>
        <div class="field"><label>Event Type</label>
          <select class="form-select" id="trigEvent">
            <option value="heavy_rain">🌊 Heavy Rain (&gt;20mm)</option>
            <option value="light_rain">🌧️ Light Rain (5–20mm)</option>
            <option value="heat">🌡️ Extreme Heat (≥42°C)</option>
            <option value="lockdown">🔒 Government Lockdown</option>
            <option value="downtime">📵 Platform Downtime (&gt;6h)</option>
            <option value="cyclone">🌀 Cyclone / Flood Alert</option>
          </select>
        </div>
        <button class="btn-primary" id="fireTrigBtn" onclick="Views._fireTrigger()">🔥 Fire Trigger</button>
      </div>
      <div class="card">
        <div class="section-head"><div class="section-title">📋 Trigger Log</div><span class="section-tag" id="trigLogCount">0 fired</span></div>
        <div id="triggerLog" style="max-height:340px;overflow-y:auto;font-size:13px;">
          <div style="color:var(--muted);font-size:13px;padding:20px 0;text-align:center;">No triggers fired yet in this session.</div>
        </div>
      </div>
    </div>
    <div class="card fade">
      <div class="section-title" style="margin-bottom:14px;">📊 Payout Preview — by Plan</div>
      <table class="data-table" id="payoutPreview">
        <thead><tr><th>Event</th><th>Simple</th><th>Standard</th><th>Premium</th></tr></thead>
        <tbody>
          ${[['🌧️ Light Rain','light_rain'],['🌊 Heavy Rain','heavy_rain'],['🌡️ Extreme Heat','heat'],['🔒 Lockdown','lockdown'],['📵 Downtime','downtime'],['🌀 Cyclone/Flood','cyclone']].map(([label,key])=>`
            <tr>
              <td>${label}</td>
              ${['simple','standard','premium'].map(p=>`<td style="color:var(--accent);font-weight:600;">₹${DB.PLANS[p].payouts[key]}</td>`).join('')}
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
  },

  async _fireTrigger() {
    const btn = document.getElementById('fireTrigBtn');
    const cityId = document.getElementById('trigCity').value;
    const eventType = document.getElementById('trigEvent').value;
    UI.setLoading(btn, true, 'Processing…');
    const result = await DataSvc.fireTrigger(cityId, eventType);
    UI.setLoading(btn, false);
    if(result.success) {
      UI.toast(`✅ Trigger fired: ${result.event} in ${result.city} — ${result.affected} workers queued for payout.`,'success',5000);
      const log = document.getElementById('triggerLog');
      const count = document.getElementById('trigLogCount');
      const existingEmpty = log.querySelector('[style*="text-align:center"]');
      if(existingEmpty) existingEmpty.remove();
      const entry = document.createElement('div');
      entry.style.cssText='padding:10px 0;border-bottom:1px solid var(--border);animation:slideIn .3s ease;';
      entry.innerHTML = `<div style="display:flex;justify-content:space-between;"><strong>${result.event}</strong><span style="font-size:11px;color:var(--muted);">${new Date().toLocaleTimeString()}</span></div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px;">${result.city} · ${result.affected} workers · ${UI.badge('Queued','yellow')}</div>`;
      log.prepend(entry);
      let cnt = parseInt(count.textContent)||0;
      count.textContent = `${cnt+1} fired`;
    }
  },
};

// ═══════════════════════════════════════════════
//  ROUTER / APP CONTROLLER
// ═══════════════════════════════════════════════

window.Views = Views;
