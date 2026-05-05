
const API_BASE = window.API_BASE || 'http://localhost:8080/api';

function showAlert(message, type = 'error') {
  const container = document.getElementById('alert-container');
  if (!container) return;
  container.innerHTML = `
    <div class="alert alert-${type}" style="margin-bottom:16px">
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
  btn.textContent = loading ? 'Criando conta...' : btn.dataset.label;
}

const registerForm = document.getElementById('register-form');

if (registerForm) {
  const btn = document.getElementById('btn-register');
  btn.dataset.label = btn.textContent;

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert();

    const firstName       = document.getElementById('first-name').value.trim();
    const lastName        = document.getElementById('last-name').value.trim();
    const email           = document.getElementById('email').value.trim();
    const password        = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      showAlert('Preencha todos os campos para continuar.');
      return;
    }

    if (password.length < 8) {
      showAlert('A senha deve ter no minimo 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('As senhas nao coincidem.');
      return;
    }

    setLoading(btn, true);

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert(data.message || 'Erro ao criar conta. Tente novamente.');
        return;
      }

      // Salva token e redireciona para o dashboard
      localStorage.setItem('salus_token', data.token);
      localStorage.setItem('salus_user', JSON.stringify(data.user));

      window.location.href = '/interface/pages/dashboard.html';

    } catch (err) {
      showAlert('Nao foi possivel conectar ao servidor. Tente novamente.');
    } finally {
      setLoading(btn, false);
    }
  });
}