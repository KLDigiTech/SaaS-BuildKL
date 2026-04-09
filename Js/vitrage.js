


// ===== PHOTO CHANTIER =====

const photos = [];
let indexActuel = 0;

const btnPhoto = document.getElementById('btnPhoto');
const inputPhoto = document.getElementById('inputPhoto');
const photoContainer = document.getElementById('photoContainer');

btnPhoto.addEventListener('click', () => {
    inputPhoto.click();
});

inputPhoto.addEventListener('change', (e) => {
    const fichier = e.target.files[0];

    const maintenant = new Date();
    const horodatage = maintenant.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const reader = new FileReader();
    reader.readAsDataURL(fichier);

    reader.onload = (ev) => {

        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${ev.target.result}" />
            <p>${horodatage}</p>
        `;

        photos.push(ev.target.result);
        analyserPhoto(ev.target.result);
        photoContainer.appendChild(div);

        const img = div.querySelector('img');
        img.addEventListener('click', () => {
            indexActuel = photos.indexOf(ev.target.result);
            ouvrirLightbox(indexActuel);
        });
    };
});

// ===== LIGHTBOX =====

function ouvrirLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    lightbox.style.display = 'flex';
    lightboxImg.src = photos[index];
};

document.getElementById('lightboxFermer').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
});

document.getElementById('lightboxNext').addEventListener('click', () => {
    indexActuel = (indexActuel + 1) % photos.length;
    document.getElementById('lightboxImg').src = photos[indexActuel];
});

document.getElementById('lightboxPrev').addEventListener('click', () => {
    indexActuel = (indexActuel - 1 + photos.length) % photos.length;
    document.getElementById('lightboxImg').src = photos[indexActuel];
});

// ===== ANALYSE IA =====

async function analyserPhoto(imageBase64) {
    const analyseResultat = document.getElementById('analyseResultat');
    analyseResultat.textContent = '🔍 Analyse en cours...';

    const response = await fetch('http://localhost:3001/analyser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBase64 })
    });

    const data = await response.json();
    analyseResultat.textContent = data.resultat;
}

// ===== SCHÉMA TRANCHE VITRAGE =====

const inputComposition = document.getElementById('composition');

// À chaque saisie dans le champ composition → on redessine le schéma
inputComposition.addEventListener('input', () => {
    dessinerSchema(inputComposition.value);
});

function dessinerSchema(composition) {
    const svg = document.getElementById('schemaVitrage');

    // On garde les defs (gradients) et on efface uniquement les formes
    const defs = svg.querySelector('defs');
    svg.innerHTML = '';
    if (defs) svg.appendChild(defs);

    if (!composition) return; // Champ vide → on ne dessine rien

    // ===== PARSING DE LA COMPOSITION =====
    // On découpe par "/" pour séparer les parties
    // Exemple : "44.2/16/44.2" → ["44.2", "16", "44.2"]
    const parties = composition.split('/');

    // Liste complète des couches à dessiner
    // Chaque couche = { epaisseur, type: 'verre' | 'air' | 'pvb' }
    const couches = [];

    parties.forEach((partie, index) => {

        if (partie.includes('.')) {
            // ===== FEUILLETÉ (ex: 44.2, 1010.2) =====
            const [verres, pvb] = partie.split('.');

            // Parse les épaisseurs de verre par paires de chiffres
            // "44" → [4,4] / "1010" → [10,10] / "664" → [6,6,4]
            // On lit chiffre par chiffre
            // Si deux chiffres consécutifs forment un nombre >= 10 → c'est un seul verre
            // Sinon chaque chiffre = un verre
            const epaisseursVerre = [];
            let i = 0;
            while (i < verres.length) {
                const premierChiffre = Number(verres[i]);
                if (premierChiffre === 1 && i + 1 < verres.length) {
                    // Premier chiffre = 1 → verre de 10, 12mm...
                    epaisseursVerre.push(Number(verres.slice(i, i + 2)));
                    i += 2;
                } else {
                    // Sinon chaque chiffre = un verre (4, 6, 8mm...)
                    epaisseursVerre.push(Number(verres[i]));
                    i += 1;
                }
            }
            // Épaisseur PVB : nombre de films × 0.38mm
            const epaisseurPVB = Number(pvb) * 0.38;

            // On ajoute les verres avec le PVB entre chaque
            epaisseursVerre.forEach((ep, i) => {
                couches.push({ epaisseur: ep, type: 'verre' });
                // PVB entre chaque verre feuilleté
                if (i < epaisseursVerre.length - 1) {
                    couches.push({ epaisseur: epaisseurPVB, type: 'pvb' });
                }
            });

        } else if (index % 2 === 1) {
            // ===== LAME D'AIR (position impaire dans le split par "/") =====
            couches.push({ epaisseur: Number(partie), type: 'air' });

        } else {
            // ===== VERRE SIMPLE =====
            couches.push({ epaisseur: Number(partie), type: 'verre' });
        }
    });

    // ===== DESSIN SVG =====

    // Épaisseur totale pour calculer les proportions
    const total = couches.reduce((a, b) => a + b.epaisseur, 0);

    const svgHeight = 120; // Hauteur des couches en px
    const svgWidth = 280;  // Largeur totale disponible en px
    const startY = 50;     // Décalage vers le bas pour les cotes au-dessus
    let currentX = 10;     // Position X de départ

    couches.forEach((couche) => {
        // Largeur proportionnelle — PVB minimum 4px pour rester visible
        const largeurCouche = couche.type === 'pvb'
            ? Math.max(4, (couche.epaisseur / total) * svgWidth)
            : (couche.epaisseur / total) * svgWidth;

        // Couleur selon le type
        const couleur = couche.type === 'verre' ? 'url(#verreGradient)'
            : couche.type === 'air' ? 'url(#airGradient)'
                : '#f5e642'; // PVB = jaune/doré

        // Dessin du rectangle
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', currentX);
        rect.setAttribute('y', startY);
        rect.setAttribute('width', largeurCouche);
        rect.setAttribute('height', svgHeight);
        rect.setAttribute('fill', couleur);
        rect.setAttribute('stroke', '#aaa');
        rect.setAttribute('stroke-width', '1');
        svg.appendChild(rect);

        // Cote au-dessus — PVB affiché seulement si assez large
        if (couche.type !== 'pvb' || largeurCouche > 8) {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', currentX + largeurCouche / 2);
            text.setAttribute('y', startY - 8);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '11');
            text.setAttribute('fill', '#333');
            text.textContent = couche.type === 'pvb'
                ? couche.epaisseur.toFixed(2) + 'mm'
                : couche.epaisseur + 'mm';
            svg.appendChild(text);
        }

        currentX += largeurCouche; // On avance vers la droite
    });

    // Épaisseur totale affichée en dessous du schéma
    const textTotal = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textTotal.setAttribute('x', 10 + svgWidth / 2);
    textTotal.setAttribute('y', startY + svgHeight + 25);
    textTotal.setAttribute('text-anchor', 'middle');
    textTotal.setAttribute('font-size', '12');
    textTotal.setAttribute('font-weight', 'bold');
    textTotal.setAttribute('fill', '#1B3A5C');
    textTotal.textContent = 'Épaisseur totale : ' + total.toFixed(2) + ' mm';
    svg.appendChild(textTotal);

    // Remplissage automatique du champ épaisseur avec arrondi au supérieur
    document.getElementById('epaisseur').value = Math.ceil(total) + ' mm (' + total.toFixed(2) + ' mm théorique)';

}

// ===== RESET FORMULAIRE =====
document.querySelector('.vitrage-form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.vitrage-form').reset();
    document.getElementById('epaisseur').value = '';
    document.getElementById('schemaVitrage').innerHTML = '';
    document.getElementById('analyseResultat').textContent = '';
    photos.length = 0;
    document.getElementById('photoContainer').innerHTML = '';
});