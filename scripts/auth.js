const API_BASE = 'http://localhost:8080/api';

// --- Utilitários ---

function showAlert(message, type = 'error') {
  const container = document.getElementById('alert-container');
  if (!container) return;

  container.innerHTML = `
    <div class="alert alert-${type}" style="margin-bottom: 16px">
      ${message}
    </div>
  `;
}

function clearAlert() {
  const container = document.getElementById('alert-container');
  if (container) container.innerHTML = '';
}

function setLoading(btn, loading) {
  btn.disabled = loading;
  btn.textContent = loading ? 'Aguarde...' : btn.dataset.label;
}

// --- Login ---

const loginForm = document.getElementById('login-form');

if (loginForm) {
  const btn = document.getElementById('btn-login');
  btn.dataset.label = btn.textContent;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      showAlert('Preencha e-mail e senha para continuar.');
      return;
    }

    setLoading(btn, true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro no login');
      }

      // Login real (backend)
      localStorage.setItem('salus_token', data.token);
      localStorage.setItem('salus_user', JSON.stringify(data.user));

      window.location.href = '/interface/pages/dashboard.html';

    } catch (err) {

      console.warn('Backend indisponível. Usando login fictício.');

      // Login fictício (fallback)
      const fakeUser = {
        firstName: 'Caio',
        lastName: 'Lucas',
        email: email
      };

      localStorage.setItem('salus_token', 'fake-jwt-token');
      localStorage.setItem('salus_user', JSON.stringify(fakeUser));

      window.location.href = '/interface/pages/dashboard.html';

    } finally {
      setLoading(btn, false);
    }
  });
}

// --- Logout ---

function logout() {
  localStorage.removeItem('salus_token');
  localStorage.removeItem('salus_user');
  window.location.href = '/interface/pages/login.html';
}

// --- Guard: redireciona se não estiver autenticado ---

function requireAuth() {
  const token = localStorage.getItem('salus_token');
  if (!token) {
    window.location.href = '/interface/pages/login.html';
  }
}