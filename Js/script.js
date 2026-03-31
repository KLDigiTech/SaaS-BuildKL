// ===== DÉCONNEXION SIDEBAR ===== AIDE IA
const btnDeconnexion = document.querySelector('a[href="../index.html"]');

btnDeconnexion.addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.clear();
  window.location.href = '../index.html';
});
//NOTIF 

const notification = document.querySelector('.notif');
const dropDown = document.getElementById('notifDropdown')

notification.addEventListener('click', (e) => {
  e.preventDefault();

  if (dropDown.style.display === 'block') {
    dropDown.style.display = 'none';  // cacher
  } else {
    dropDown.style.display = 'block'; // afficher
  }
});
document.addEventListener('click', (e) => {
    if (!notification.contains(e.target)) {
        dropDown.style.display = 'none';
    }
});