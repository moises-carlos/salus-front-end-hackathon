requireAuth();

const circle = document.getElementById('breath-circle');
const text = document.getElementById('breath-text');

let state = 'in';
let currentCrisisId = null;

// Ativar crise ao entrar na página
async function initCrisis() {
  const userId = localStorage.getItem('salus_user_id');
  if (userId) {
    try {
      const crisis = await window.salusApi.activateCrisis(userId, 10); // Intensidade alta por padrão aqui
      currentCrisisId = crisis.id;
      console.log('Crise ativada:', currentCrisisId);
    } catch (err) {
      console.error('Falha ao registrar início da crise no backend:', err);
    }
  }
}

initCrisis();

// Loop de respiração
setInterval(() => {
  if (!circle || !text) return;

  if (state === 'in') {
    circle.classList.add('active');
    text.textContent = 'Segure...';
    state = 'hold';
  }

  else if (state === 'hold') {
    text.textContent = 'Expire...';
    state = 'out';
  }

  else {
    circle.classList.remove('active');
    text.textContent = 'Inspire...';
    state = 'in';
  }

}, 4000);

// Voltar e resolver crise
async function goBack() {
  if (currentCrisisId) {
    const userId = localStorage.getItem('salus_user_id');
    try {
      await window.salusApi.resolveCrisis(currentCrisisId, userId);
      console.log('Crise resolvida:', currentCrisisId);
    } catch (err) {
      console.error('Falha ao resolver crise no backend:', err);
    }
  }
  window.location.href = '/interface/pages/dashboard.html';
}

// Ação de ajuda
function callHelp() {
  alert('Considere entrar em contato com alguém de confiança ou um profissional.');
  // futuro: window.location.href = 'tel:188';
}