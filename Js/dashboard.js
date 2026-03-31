

//date automatique

const dateNow = document.getElementById('date-aujourd-hui');
const maintenant = new Date();
const dateFormatee = maintenant.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});
dateNow.textContent = dateFormatee;