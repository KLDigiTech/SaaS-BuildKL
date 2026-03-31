// tableau avec objets utilisateurs fictifs

const utilisateurs = [
  { login: "kevin", mdp: "1234", role: "patron", nom: "Kévin" },
  { login: "cathy", mdp: "1234", role: "secrétaire", nom: "Cathy" },
];

//créer une variable du bouton

const btnConnexion = document.getElementById("btnConnexion");



//creer l'evenement click avec alerte sur la page

btnConnexion.addEventListener("click", (e) => {
  e.preventDefault();
  const identifiant = document.getElementById("identifiant").value;
  const motDePasse = document.getElementById("password").value;
  const utilisateurTrouve = utilisateurs.find((u) => {
    return u.login === identifiant && u.mdp === motDePasse;
  });
  if (utilisateurTrouve) {
    sessionStorage.setItem('user', JSON.stringify(utilisateurTrouve));
    window.location.href = "Pages/dashboard.html";
  } else {
    document.getElementById("erreurMsg").style.display = "block";
    document.getElementById("loginForm").reset();
  }
  
});

