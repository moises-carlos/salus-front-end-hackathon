const API_BASE_URL = 'https://back-end-salus.onrender.com/api/v1';

const api = {
  // --- Auth ---
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return this._handleResponse(response);
  },

  async register(name, email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return this._handleResponse(response);
  },

  // --- Monitoring ---
  async checkIn(userId, moodLevel, tags = [], notes = "") {
    const response = await fetch(`${API_BASE_URL}/monitoring/check-in?userId=${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moodLevel, tags, notes }),
    });
    return this._handleResponse(response);
  },

  async getHistory(userId) {
    const response = await fetch(`${API_BASE_URL}/monitoring/history?userId=${userId}`);
    return this._handleResponse(response);
  },

  async getPatterns(userId) {
    const response = await fetch(`${API_BASE_URL}/monitoring/patterns?userId=${userId}`);
    return this._handleResponse(response);
  },

  // --- Crisis ---
  async activateCrisis(userId, intensity = 5) {
    const response = await fetch(`${API_BASE_URL}/crisis/activate?userId=${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ intensity }),
    });
    return this._handleResponse(response);
  },

  async resolveCrisis(crisisId, userId) {
    const response = await fetch(`${API_BASE_URL}/crisis/${crisisId}/resolve?userId=${userId}`, {
      method: 'PUT',
    });
    return this._handleResponse(response);
  },

  // --- Support ---
  async getProfessionals(specialty = '') {
    const url = specialty 
      ? `${API_BASE_URL}/support/professionals?specialty=${specialty}`
      : `${API_BASE_URL}/support/professionals`;
    const response = await fetch(url);
    return this._handleResponse(response);
  },

  // --- Internal Helper ---
  async _handleResponse(response) {
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      throw new Error(error);
    }

    return data;
  }
};

// Expose globally
window.salusApi = api;
