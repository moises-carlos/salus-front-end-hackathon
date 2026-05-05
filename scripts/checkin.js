

requireAuth();

let selectedMood = null;

// Seleção de humor
const moodItems = document.querySelectorAll('.mood-item');

moodItems.forEach(item => {
  item.addEventListener('click', () => {
    moodItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    selectedMood = item.dataset.value;
  });
});

// Botão salvar
const btn = document.getElementById('submit-checkin');

if (btn) {
  btn.addEventListener('click', async () => {

    clearAlert?.();

    if (!selectedMood) {
      showAlert?.('Selecione como você está se sentindo.');
      return;
    }

    const note = document.getElementById('note').value;

    try {
      const userId = localStorage.getItem('salus_user_id');
      
      if (!userId) {
        throw new Error('Usuário não identificado. Faça login novamente.');
      }

      await window.salusApi.checkIn(userId, Number(selectedMood), [], note);

      showAlert?.('Check-in salvo com sucesso.', 'success');

      setTimeout(() => {
        window.location.href = '/interface/pages/dashboard.html';
      }, 1200);

    } catch (err) {
      console.error('Erro no check-in:', err);
      console.warn('Backend indisponível — salvando localmente');

      // fallback local
      const localData = JSON.parse(localStorage.getItem('salus_checkins') || '[]');

      localData.push({
        mood: selectedMood,
        note,
        date: new Date().toISOString()
      });

      localStorage.setItem('salus_checkins', JSON.stringify(localData));

      showAlert?.('Check-in salvo localmente.', 'success');

      setTimeout(() => {
        window.location.href = '/interface/pages/dashboard.html';
      }, 1200);
    }
  });
}

// Navegação
function goBack() {
  window.location.href = '/interface/pages/dashboard.html';
}