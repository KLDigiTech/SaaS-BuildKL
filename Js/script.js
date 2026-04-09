
// ===== DÉCONNEXION =====

const btnDeconnexion = document.querySelector('a[href="../index.html"]');

if (btnDeconnexion) {
    btnDeconnexion.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = '../../index.html';
    });
}

// ===== NOTIFICATIONS =====

const notification = document.querySelector('.notif');
const dropDown = document.getElementById('notifDropdown');

if (notification && dropDown) {
    notification.addEventListener('click', (e) => {
        e.preventDefault();
        if (dropDown.style.display === 'block') {
            dropDown.style.display = 'none';
        } else {
            dropDown.style.display = 'block';
        }
    });

    document.addEventListener('click', (e) => {
        if (!notification.contains(e.target)) {
            dropDown.style.display = 'none';
        }
    });
}