const typeMenuiserie = document.getElementById('type-menuiserie');
const largeurInput = document.getElementById('largeur');
const hauteurInput = document.getElementById('hauteur');
const vsGauche = document.getElementById('vs-gauche');
const vsDroite = document.getElementById('vs-droite');
const sensOuverture = document.getElementById('poignee-options');
const ouvGauche = document.getElementById('poignee-gauche');
const ouvDroite = document.getElementById('poignee-droite');
const poseTunnel = document.getElementById('tunnel');
const poseReno = document.getElementById('renovation');
const poseApplique = document.getElementById('applique');

document.getElementById('add-devis-btn').addEventListener('click', function () {

    const liste = document.querySelector('.devis-list');
    const form = document.querySelector('.devis-form');

    liste.style.display = 'none';
    form.style.display = 'flex';

});

//const produit = document.getElementById('select-produit');

function chargerCatalogue() {
    const catalogue = JSON.parse(localStorage.getItem('catalogue')) || [];
    // vider la liste d'abord
    produit.innerHTML = '';

    // pour chaque produit, créer un li
    catalogue.forEach(item => {
        const option = document.createElement('option');
        option.textContent = item.cat + ' - ' + item.nom + ' : ' + item.prix + '€';
        produit.appendChild(option);
    });
};

//chargerCatalogue();

function dessinerElevation(type, largeur, hauteur, vsGauche, vsDroite, ouvGauche, ouvDroite) {
    const elevation = document.getElementById('elevation');

    let contenu = '';

    if (type === 'fixe') {
        contenu = `
            <defs>
            <marker id="fleche" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#1B3A5C"/>
            </marker>
            <marker id="fleche-gauche" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="10 0, 0 3.5, 10 7" fill="#1B3A5C"/>
            </marker>
            </defs>
            <line x1="10" y1="405" x2="290" y2="405" stroke="#1B3A5C" stroke-width="1" marker-end="url(#fleche)" marker-start="url(#fleche-gauche)"/>
            <line x1="305" y1="10" x2="305" y2="390" stroke="#1B3A5C" stroke-width="1" marker-end="url(#fleche)" marker-start="url(#fleche-gauche)"/>
            <rect x="10" y="10" width="280" height="380" fill="none" stroke="#1B3A5C" stroke-width="3"/>
            <text x="150" y="430" text-anchor="middle" font-size="12" fill="#1B3A5C">${largeur} mm</text>
            <text x="310" y="200" text-anchor="middle" font-size="12" fill="#1B3A5C" transform="rotate(90, 320, 200)">${hauteur} mm</text>
            <line x1="100" y1="195" x2="200" y2="195" stroke="#FF0000"/>
            <line x1="150" y1="100" x2="150" y2="300" stroke="#FF0000"/>
    `;
    } else if (type === 'Of 2 vantaux') {
        contenu = `
            <rect x="10" y="10" width="280" height="380" fill="none" stroke="#1B3A5C" stroke-width="3"/>
            <text x="150" y="415" text-anchor="middle" font-size="12" fill="#1B3A5C">${largeur} mm</text>
            <text x="310" y="200" text-anchor="middle" font-size="12" fill="#1B3A5C" transform="rotate(90, 310, 200)">${hauteur} mm</text>
            <line x1="150" y1="10" x2="150" y2="390" stroke="#1B3A5C" stroke-width="2"/>
            <line x1="10" y1="10" x2="290" y2="390" stroke="#FF0000"/>
            <line x1="10" y1="390" x2="290" y2="10" stroke="#FF0000"/>
            ${vsGauche ? '<text x="80" y="200" text-anchor="middle" font-size="20" fill="#1B3A5C">VS</text>' : ''}
            ${vsDroite ? '<text x="220" y="200" text-anchor="middle" font-size="20" fill="#1B3A5C">VS</text>' : ''}
        `;
    } else if (type === 'Of 1 vantail') {
        contenu = `
            <rect x="80" y="10" width="210" height="380" fill="none" stroke="#1B3A5C" stroke-width="3"/>
            <text x="190" y="415" text-anchor="middle" font-size="12" fill="#1B3A5C">${largeur} mm</text>
            <text x="310" y="200" text-anchor="middle" font-size="12" fill="#1B3A5C" transform="rotate(90, 310, 200)">${hauteur} mm</text>           
            ${ouvGauche ? '<line x1="80" y1="195" x2="290" y2="10" stroke="#FF0000"/><line x1="80" y1="195" x2="290" y2="390" stroke="#FF0000"/>' : ''}
            ${ouvDroite ? '<line x1="290" y1="195" x2="80" y2="10" stroke="#FF0000"/><line x1="290" y1="195" x2="80" y2="390" stroke="#FF0000"/>' : ''}
        `;
    } else if (type === 'coulissant 2 vantaux') {
        contenu = `
            <rect x="10" y="10" width="280" height="380" fill="none" stroke="#1B3A5C" stroke-width="3"/>
            <text x="150" y="415" text-anchor="middle" font-size="12" fill="#1B3A5C">${largeur} mm</text>
            <text x="310" y="200" text-anchor="middle" font-size="12" fill="#1B3A5C" transform="rotate(90, 310, 200)">${hauteur} mm</text>
            <line x1="150" y1="10" x2="150" y2="390" stroke="#1B3A5C" stroke-width="2"/>
            <line x1="75" y1="195" x2="225" y2="195" stroke="#FF0000"/>
            <line x1="130" y1="175" x2="170" y2="215" stroke="#FF0000"/>
            <line x1="170" y1="175" x2="130" y2="215" stroke="#FF0000"/>
            ${vsGauche ? '<text x="80" y="240" text-anchor="middle" font-size="20" fill="#1B3A5C">VS</text>' : ''}
            ${vsDroite ? '<text x="220" y="240" text-anchor="middle" font-size="20" fill="#1B3A5C">VS</text>' : ''}
        `;
    } else if (type === 'porte 1 vantail') {
        contenu = `
            <rect x="80" y="10" width="210" height="380" fill="none" stroke="#1B3A5C" stroke-width="3"/>
            <text x="190" y="415" text-anchor="middle" font-size="12" fill="#1B3A5C">${largeur} mm</text>
            <text x="310" y="200" text-anchor="middle" font-size="12" fill="#1B3A5C" transform="rotate(90, 310, 200)">${hauteur} mm</text>
            ${ouvGauche ? '<line x1="80" y1="195" x2="290" y2="10" stroke="#FF0000"/><line x1="80" y1="195" x2="290" y2="390" stroke="#FF0000"/>' : ''}
            ${ouvDroite ? '<line x1="290" y1="195" x2="80" y2="10" stroke="#FF0000"/><line x1="290" y1="195" x2="80" y2="390" stroke="#FF0000"/>' : ''}  
        `;
    }

    elevation.innerHTML = `
        <svg width="350" height="440" style="border:1px solid #ccc">
            ${contenu}
        </svg>
    `;
}



typeMenuiserie.addEventListener('change', function () {
    dessinerElevation(typeMenuiserie.value, largeurInput.value, hauteurInput.value, vsGauche.checked, vsDroite.checked, ouvGauche.checked, ouvDroite.checked);
    const vsOptions = document.getElementById('vs-options');
    if (typeMenuiserie.value === 'Of 2 vantaux' || typeMenuiserie.value === 'coulissant 2 vantaux') {
        vsOptions.style.display = 'block';
    } else {
        vsOptions.style.display = 'none';
    }
    if (typeMenuiserie.value === 'Of 1 vantail' || typeMenuiserie.value === 'porte 1 vantail') {
        sensOuverture.style.display = 'block';
    } else {
        sensOuverture.style.display = 'none';
    }
});

largeurInput.addEventListener('input', function () {
    dessinerElevation(typeMenuiserie.value, largeurInput.value, hauteurInput.value, vsGauche.checked, vsDroite.checked, ouvGauche.checked, ouvDroite.checked);
});

hauteurInput.addEventListener('input', function () {
    dessinerElevation(typeMenuiserie.value, largeurInput.value, hauteurInput.value, vsGauche.checked, vsDroite.checked, ouvGauche.checked, ouvDroite.checked);
});
vsGauche.addEventListener('change', function () {
    if (vsGauche.checked) vsDroite.checked = false;
    dessinerElevation(typeMenuiserie.value, largeurInput.value, hauteurInput.value, vsGauche.checked, vsDroite.checked, ouvGauche.checked, ouvDroite.checked);
});

vsDroite.addEventListener('change', function () {
    if (vsDroite.checked) vsGauche.checked = false;
    dessinerElevation(typeMenuiserie.value, largeurInput.value, hauteurInput.value, vsGauche.checked, vsDroite.checked, ouvGauche.checked, ouvDroite.checked);
});

ouvGauche.addEventListener('change', function () {
    if (ouvGauche.checked) ouvDroite.checked = false;
    dessinerElevation(typeMenuiserie.value, largeurInput.value, hauteurInput.value, vsGauche.checked, vsDroite.checked, ouvGauche.checked, ouvDroite.checked);
});

ouvDroite.addEventListener('change', function () {
    if (ouvDroite.checked) ouvGauche.checked = false;
    dessinerElevation(typeMenuiserie.value, largeurInput.value, hauteurInput.value, vsGauche.checked, vsDroite.checked, ouvGauche.checked, ouvDroite.checked);
});
poseTunnel.addEventListener('change', function () {
    if (poseTunnel.checked) {
        poseReno.checked = false;
        poseApplique.checked = false;
        document.querySelector('.lg_tab').style.display = 'block';
        document.querySelector('.ht_tab').style.display = 'block';
    } else {
        document.querySelector('.lg_tab').style.display = 'none';
        document.querySelector('.ht_tab').style.display = 'none';
    }
});
poseReno.addEventListener('change', function () {
    if (poseReno.checked) {
        poseTunnel.checked = false;
        poseApplique.checked = false;
        document.querySelector('.lg_tab').style.display = 'none';
        document.querySelector('.ht_tab').style.display = 'none';
    }
});
poseApplique.addEventListener('change', function () {
    if (poseApplique.checked) {
        poseReno.checked = false;
        poseTunnel.checked = false;
        document.querySelector('.lg_tab').style.display = 'none';
        document.querySelector('.ht_tab').style.display = 'none';
    }
});