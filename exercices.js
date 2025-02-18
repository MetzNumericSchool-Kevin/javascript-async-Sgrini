/**
 * Code de base, ne pas modifier
 */

// Définition
const boutonVoyageHTML = document.querySelector(".btn-voyage");
const localisationEpoqueHTML = document.querySelector(".localisation_epoque");
const listeArtefactHTML = document.querySelector(".liste_artefacts");
const formChoixEpoqueHtml = document.querySelector(".form__choix_epoque");
const formRechercheArtefact = document.querySelector(
  ".form__recherche_artefact"
);
const loaderArtefact = document.querySelector(".recherche_en_cours");
const creerLesChoixEpoque = (epoques) => {
  const selectHtml = formChoixEpoqueHtml.querySelector("select");
  Object.entries(epoques).forEach(([id_epoque, nom_epoque]) => {
    const option = document.createElement("option");
    option.value = id_epoque;
    option.text = nom_epoque;
    selectHtml.appendChild(option);
  });
};

function generationNombreAleatoireEntre(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Permet d'afficher l'époque de destination du voyage
const afficherDestination = (nomEpoque) =>
  (localisationEpoqueHTML.textContent = nomEpoque);

// Permet d'afficher un artefact trouvée, ou non, à une époque
const afficherRechercheArtefact = ({ artefact, epoque, success = true }) => {
  const li = document.createElement("li");
  li.textContent = `${success ? "✅" : "❌"} ${artefact} (Epoque ${epoque})`;
  listeArtefactHTML.appendChild(li);
};

// Execution

// Gestion envoi formulaire choix époque
formChoixEpoqueHtml.addEventListener("submit", (event) => {
  event.preventDefault();
  const epoque = new FormData(formChoixEpoqueHtml).get("epoque");

  if (!epoque) {
    alert("Choisie une époque de voyage temporel Chronos !");
    return;
  }

  quandEpoqueChoisie(epoque);
});

// Gestion envoi formulaire recherche artelefact
formRechercheArtefact.addEventListener("submit", (event) => {
  event.preventDefault();
  const artefact = new FormData(formRechercheArtefact).get("artefact");
  quandRechercheArtefact(artefact);
});

/**
 * Votre partie commence ici, la partie modifiable par vos soins
 */
function main() {
  // Sera modifié par le dernier exercice
  const epoques = {
    romaine: "Romaine",
    medievale: "Médievale",
    jurassique: "Jurassique",
  };

  // Création dynamique des époques de destination de la machine temporelle
  creerLesChoixEpoque(epoques);
}

main();
let nomEpoqueActuelle;

// Fonction appelée plus haut quand le formulaire de voyage temporel est soumis
// et qu'une époque de destination du voyage temporel a été choisi
const hideTime = document.querySelector(".localisation_epoque");
const loader = document.querySelector(".voyage_en_cours");
function quandEpoqueChoisie(nomEpoque) {
  nomEpoqueActuelle = nomEpoque;
  // console.log(nomEpoque);
  loader.style.display = "block";
  hideTime.textContent = "";
  // Utilisation de votre fonction voyagerTemps
  voyagerTemps(nomEpoque, () => {
    // console.log("Arrivé à ", nomEpoqueActuelle);
    hideTime.textContent = nomEpoqueActuelle;
    loader.style.display = "none";
  });
}

// Fonction appelée plus haut quand le formulaire de recherche d'artefact est soumis

// Le téléporteur temporel
function voyagerTemps(destination, voyageterminer) {
  console.log("Voyage en cours vers ", destination);
  setTimeout(() => {
    voyageterminer(destination);
  }, generationNombreAleatoireEntre(1000, 3000));
}

// voyagerTemps("destA", function () {
//   console.log("tache A");
// });

// voyagerTemps("destB", function () {
//   console.log("tache B");
// });

// La collect d'artefact mystère

function collecterArtefact(nomArtefact, callback) {
  setTimeout(() => {
    callback(nomArtefact);
  }, generationNombreAleatoireEntre(1000, 3000));
}
function quandRechercheArtefact(artefact) {
  loaderArtefact.style.display = "block";
  collecterArtefact(artefact, (idartefact) => {
    if (Math.random() * 100 >= 50) {
      afficherRechercheArtefact({
        artefact: idartefact,
        epoque: nomEpoqueActuelle,
      });
    } else {
      afficherRechercheArtefact({
        artefact: idartefact,
        epoque: nomEpoqueActuelle,
        success: false,
      });
    }
    loaderArtefact.style.display = "none";
  });
}

// La mission temporelle complexe

function missionTemporelleComplexe() {
  console.log("Mission complexe commence...");
  voyagerTemps("medievale", () => {
    console.log("Je suis à arrivé à l'époque médiévale.");
    collecterArtefact("épée de chevalier", () => {
      console.log("J'ai collecter l'épée de chevalier.");
      voyagerTemps("romaine", () => {
        console.log("Je suis à arrivé à l'époque romaine.");
        collecterArtefact("bouclier romain", () => {
          console.log("J'ai collecter un bouclier romain.");
          collecterArtefact("épée romaine", () => {
            console.log("J'ai collecter une épée romaine.");
            console.log("Fin de la mission, retour à la caserne.");
          });
        });
      });
    });
  });

  console.log("fin execution synchrone de la fonction mission temporelle");
}

missionTemporelleComplexe();
