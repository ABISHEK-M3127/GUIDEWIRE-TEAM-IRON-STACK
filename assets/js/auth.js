'use strict';

const Auth = {
  token: null,
  user: null,
  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = DB.USERS.find(u => u.email === email && u.password === password);
        if (user) {
          this.token = 'tok_' + Math.random().toString(36).slice(2);
          this.user = {...user};
          resolve({user: this.user, token: this.token});
        } else {
          reject(new Error('Invalid email or password.'));
        }
      }, 700);
    });
  },
  logout() {
    this.token = null;
    this.user = null;
  },
  getUser() { return this.user; },
  isAdmin() { return this.user?.role === 'admin'; },
};

// ═══════════════════════════════════════════════
//  DATA SERVICE — simulates API endpoints
// ═══════════════════════════════════════════════

window.Auth = Auth;
