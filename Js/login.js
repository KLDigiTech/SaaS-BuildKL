
// ===== UTILISATEURS FICTIFS (à remplacer par API backend) =====

const utilisateurs = [
  { login: "kevin", mdp: "1234", role: "patron", nom: "Kévin" },
  { login: "cathy", mdp: "1234", role: "secrétaire", nom: "Cathy" },
];

// ===== BOUTON CONNEXION ====

const btnConnexion = document.getElementById("btnConnexion");

btnConnexion.addEventListener("click", (e) => {
  e.preventDefault();

  // Récupérer les valeurs des champs

  const identifiant = document.getElementById("identifiant").value;
  const motDePasse = document.getElementById("password").value;

  // Vérifier si l'utilisateur existe

  const utilisateurTrouve = utilisateurs.find((u) => {
    return u.login === identifiant && u.mdp === motDePasse;
  });

  // Rediriger ou afficher erreur

  if (utilisateurTrouve) {
    sessionStorage.setItem('user', JSON.stringify(utilisateurTrouve));
    window.location.href = "Pages/dashboard.html";
  } else {
    document.getElementById("erreurMsg").style.display = "block";
    document.getElementById("loginForm").reset();
  }

});

