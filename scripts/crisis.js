requireAuth();

const circle = document.getElementById('breath-circle');
const text = document.getElementById('breath-text');

let state = 'in';

// Loop de respiração
setInterval(() => {

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

// Voltar
function goBack() {
  window.location.href = '/interface/pages/dashboard.html';
}

// Ação de ajuda
function callHelp() {

  alert('Considere entrar em contato com alguém de confiança ou um profissional.');

  // futuro:
  // window.location.href = 'tel:188'; (CVV no Brasil)
}