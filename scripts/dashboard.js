requireAuth();

// --- Dados do usuário ---
const user = JSON.parse(localStorage.getItem('salus_user'));

if (user) {
  // O backend retorna 'name', mas o código anterior usava 'firstName'
  const displayName = user.name || user.firstName || 'Usuário';
  document.getElementById('welcome-text').textContent = `Olá, ${displayName} `;
  document.getElementById('user-email').textContent = user.email || '';
}

// --- Carregar dados do Backend ---
async function loadDashboardData() {
  const userId = localStorage.getItem('salus_user_id');
  if (!userId) return;

  try {
    // 1. Carregar Histórico (último check-in)
    const history = await window.salusApi.getHistory(userId);
    if (history && history.length > 0) {
      const last = history[0]; // Assumindo que vem ordenado por data decrescente
      updateLastCheckinUI(last);
    }

    // 2. Carregar Padrões
    const patterns = await window.salusApi.getPatterns(userId);
    updatePatternsUI(patterns);

  } catch (err) {
    console.error('Erro ao carregar dados do dashboard:', err);
  }
}

function updateLastCheckinUI(checkin) {
  const container = document.querySelector('.card-small:nth-of-type(2) p');
  if (!container) return;

  const emojis = { 1: '😞', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' };
  const labels = { 1: 'Muito mal', 2: 'Mal', 3: 'Neutro', 4: 'Bem', 5: 'Muito bem' };
  
  const emoji = emojis[checkin.moodLevel] || '😶';
  const label = labels[checkin.moodLevel] || 'Sem dados';
  
  container.innerHTML = `<span style="font-size: 1.5rem">${emoji}</span> ${label}`;
}

function updatePatternsUI(patterns) {
  const container = document.querySelector('.card-highlight p');
  if (!container) return;

  // patterns do backend no swagger parece ser apenas um número (Schema 0)
  // mas vamos assumir que pode ser um resumo
  if (typeof patterns === 'number') {
    container.textContent = `Seu nível médio de bem-estar está em ${patterns.toFixed(1)}/5.0`;
  } else {
    container.textContent = patterns || 'Continue registrando para ver seus padrões.';
  }
}

loadDashboardData();

// --- Navegação ---
function goToCheckin() {
  window.location.href = '/interface/pages/checkin.html';
}

function goToCrisis() {
  window.location.href = '/interface/pages/crisis.html';
}

function logout() {
  localStorage.removeItem('salus_token');
  localStorage.removeItem('salus_user');
  localStorage.removeItem('salus_user_id');
  window.location.href = '/interface/pages/login.html';
}