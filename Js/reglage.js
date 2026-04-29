const nomDuProduit = document.getElementById('product-name');
const prixDuProduit = document.getElementById('product-price');
const listeCatalogue = document.getElementById('catalogue-list');
const ajoutProduit = document.getElementById('btn-ajout');
const categorie = document.getElementById('categorie');

ajoutProduit.addEventListener('click', () => {

    const nom = nomDuProduit.value;
    const prix = prixDuProduit.value;
    const cat = categorie.value;

    if (nom === '' || prix === '' || cat === '') {
        alert('Veuillez remplir tous les champs.');
        return;
    }
    // Lire le catalogue existant (ou tableau vide si rien)
    const catalogue = JSON.parse(localStorage.getItem('catalogue')) || [];

    // Créer le nouvel objet produit
    const produit = { cat, nom, prix };

    // Ajouter au tableau
    catalogue.push(produit);

    // Sauvegarder
    localStorage.setItem('catalogue', JSON.stringify(catalogue));
    afficherCatalogue();
    nomDuProduit.value = '';
    prixDuProduit.value = '';
    categorie.value = '';
});

function afficherCatalogue() {
    const catalogue = JSON.parse(localStorage.getItem('catalogue')) || [];

    // vider la liste d'abord
    listeCatalogue.innerHTML = '';

    // pour chaque produit, créer un li
    catalogue.forEach(produit => {
        const li = document.createElement('li');
        li.textContent = produit.cat + ' - ' + produit.nom + ' : ' + produit.prix + '€';
        listeCatalogue.appendChild(li);
    });
}

afficherCatalogue();