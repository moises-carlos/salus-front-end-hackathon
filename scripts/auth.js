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
      // Usando o novo serviço de API
      const data = await window.salusApi.login(email, password);

      // O backend retorna { id, name, role }
      localStorage.setItem('salus_token', data.id); // Usando ID como token por enquanto
      localStorage.setItem('salus_user', JSON.stringify(data));
      localStorage.setItem('salus_user_id', data.id);

      window.location.href = '/interface/pages/dashboard.html';

    } catch (err) {
      console.error('Erro no login:', err);
      
      // Fallback para desenvolvimento caso o backend falhe
      if (err.message.includes('Failed to fetch') || err.message.includes('404')) {
        console.warn('Backend indisponível. Usando login fictício.');
        const fakeUser = {
          id: 'fake-uuid-123',
          name: 'Usuário Teste',
          email: email
        };
        localStorage.setItem('salus_token', 'fake-jwt-token');
        localStorage.setItem('salus_user', JSON.stringify(fakeUser));
        localStorage.setItem('salus_user_id', fakeUser.id);
        window.location.href = '/interface/pages/dashboard.html';
      } else {
        showAlert(err.message || 'Erro no login. Verifique suas credenciais.');
      }
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