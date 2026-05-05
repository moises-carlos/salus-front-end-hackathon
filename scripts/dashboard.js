requireAuth();

// --- Dados do usuário ---
const user = JSON.parse(localStorage.getItem('salus_user'));

if (user) {
  const firstName = user.firstName || 'Usuário';
  document.getElementById('welcome-text').textContent = `Olá, ${firstName} `;
  document.getElementById('user-email').textContent = user.email;
}

// --- Navegação ---
function goToCheckin() {
  window.location.href = '/interface/pages/checkin.html';
}

function goToCrisis() {
  window.location.href = '/interface/pages/crisis.html';
}