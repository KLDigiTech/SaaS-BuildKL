// ===== DÉCONNEXION SIDEBAR ===== AIDE IA
const btnDeconnexion = document.querySelector('a[href="../index.html"]');

btnDeconnexion.addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.clear();
  window.location.href = '../index.html';
});
