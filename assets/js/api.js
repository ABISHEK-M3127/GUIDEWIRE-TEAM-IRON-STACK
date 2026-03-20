'use strict';

const API = {
  selectedRole: 'worker',

  setRole(role) {
    this.selectedRole = role;
    document.getElementById('roleWorker').classList.toggle('active', role==='worker');
    document.getElementById('roleAdmin').classList.toggle('active', role==='admin');
    document.getElementById('loginEmail').value = role==='worker'?'worker@gigshield.in':'admin@gigshield.in';
    document.getElementById('loginPass').value = role==='worker'?'worker123':'admin123';
  },

  async login() {
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPass').value;
    const btn = document.getElementById('loginBtn');
    const errEl = document.getElementById('loginError');
    errEl.classList.add('hidden');
    UI.setLoading(btn, true, 'Signing in…');
    try {
      const {user} = await Auth.login(email, pass);
      UI.setLoading(btn, false);
      this.enterApp(user);
    } catch(e) {
      UI.setLoading(btn, false);
      errEl.textContent = e.message;
      errEl.classList.remove('hidden');
    }
  },

  enterApp(user) {
    UI.hide('loginPage');
    UI.show('appShell');
    document.getElementById('topAvatar').textContent = UI.avatar(user.name);
    document.getElementById('topName').textContent = user.name;

    if(user.role==='worker') {
      UI.show('workerNav');
      UI.hide('adminNav');
      this.bindWorkerNav();
      this.showWorkerTab('w-overview');
    } else {
      UI.show('adminNav');
      UI.hide('workerNav');
      this.bindAdminNav();
      this.showAdminTab('a-overview');
    }
    LiveSim.start();
  },

  logout() {
    LiveSim.stop();
    Auth.logout();
    UI.hide('appShell');
    UI.show('loginPage');
    document.getElementById('workerNav').classList.add('hidden');
    document.getElementById('adminNav').classList.add('hidden');
    document.getElementById('tabContent').innerHTML = '';
    document.getElementById('loginError').classList.add('hidden');
    UI.toast('Logged out successfully.','info',2000);
  },

  bindWorkerNav() {
    document.querySelectorAll('#workerNav .nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#workerNav .nav-tab').forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        this.showWorkerTab(tab.dataset.tab);
      });
    });
  },

  showWorkerTab(tabId) {
    const prev = document.getElementById('tabContent')._unsub;
    if(typeof prev === 'function') prev();
    const views = {
      'w-overview': ()=>Views.workerOverview(),
      'w-plan':     ()=>Views.workerPlan(),
      'w-risk':     ()=>Views.workerRisk(),
      'w-payouts':  ()=>Views.workerPayouts(),
      'w-settings': ()=>Views.workerSettings(),
    };
    (views[tabId]||views['w-overview'])();
  },

  bindAdminNav() {
    document.querySelectorAll('#adminNav .nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#adminNav .nav-tab').forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        this.showAdminTab(tab.dataset.tab);
      });
    });
  },

  showAdminTab(tabId) {
    const views = {
      'a-overview': ()=>Views.adminOverview(),
      'a-workers':  ()=>Views.adminWorkers(),
      'a-risk':     ()=>Views.adminRisk(),
      'a-plans':    ()=>Views.adminPlans(),
      'a-triggers': ()=>Views.adminTriggers(),
    };
    (views[tabId]||views['a-overview'])();
  },
};

// Close modal on overlay click
document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if(e.target === this) UI.closeModal();
});

// Boot
window.addEventListener('load', () => {
  setTimeout(() => {
    UI.hide('pageLoader');
    UI.show('loginPage');
  }, 800);
});

window.API = API;
