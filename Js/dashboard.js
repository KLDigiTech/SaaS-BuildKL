//date automatique

const dateNow = document.getElementById("date-aujourd-hui");
const maintenant = new Date();
const dateFormatee = maintenant.toLocaleDateString("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
dateNow.textContent = dateFormatee;


// graphique charts aide IA

const ctx = document.getElementById('graphFinance');

if (ctx) {
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
      datasets: [{
        label: 'CA Mensuel (€)',
        data: [32000, 45000, 38000, 51000, 42000, 45000],
        backgroundColor: '#1B3A5C',
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => value + ' €'
          }
        }
      }
    }
  });
}

