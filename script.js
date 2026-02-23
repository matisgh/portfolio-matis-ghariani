const app = Vue.createApp({
  data() {
    return {
      // contient la liste complete de fichier json
      projects: [],
      photos: [
        { src: "img/export-1.jpg" },
        { src: "img/export-2.jpg" },
        { src: "img/export-3.jpg" },
        { src: "img/export-4.jpg" },
      ],
      photos2: [
        { src: "img/premierportfolio_acceuil.png" },
        { src: "img/premierportfolio_projets.png" },
        { src: "img/premierportfolio_contacts.png" },
      ],
      // ici quon stock les donne du projet de l'id coresspondant a l'url
      selectedProject: null,
    };
  },
  mounted() {
    // recupere les parametres de l'url
    const urlParams = new URLSearchParams(window.location.search);
    // extraire la valeur du parametre id de l'url
    const projectId = urlParams.get("id");

    // charger la liste des projets depuis fichier json
    fetch("projects.json")
      .then((data) => data.json()) // Convertir les données au format désiré
      .then((result) => {
        this.projects = result; // stock le tout dans projects
        if (projectId) {
          // trouver le projet correspondant a l'id de l'url
          const found = this.projects.find((p) => p.id === projectId);
          if (found) {
            // si projet correspondant trouver, place les donnes dans selectedProject
            this.selectedProject = found;
            console.log("Projet trouvé :", found);
          } else {
            console.warn("Aucun projet trouvé pour l'id :", projectId);
          }
        }
      });
  },
});

app.component("photo-gallery", {
  // reçoit le tableau
  props: ["images"],
  data() {
    return {
      // Galerie est cachée au départ
      showGallery: false,
      // index de l'image actuellement afficher (donc invisible)
      currentIndex: 0,
    };
  },
  computed: {
    currentImage() {
      // retourne l'image actuellement afficher et utilise les images reçues
      return this.images[this.currentIndex];
    },
  },
  methods: {
    // Ouvre la galerie
    openGallery(index = 0) {
      this.currentIndex = index; // Ouvre l'index
      this.showGallery = true;
    },
    // ferme la galerie
    closeGallery() {
      this.showGallery = false;
    },
    // passse a l'image suivante
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    // passse a l'image precedente
    prevImage() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
  },
  // Partie visuelle de la composante vu (se qui s'affiche dans html)
  template: `
    <div>
      <!-- Bouton d'ouverture -->
      <div class="btnjouer">
        <button @click="openGallery()">Ouvrir la galerie</button>
      </div>

      <!-- Galerie plein écran -->
      <div v-if="showGallery" class="fullscreen-gallery">
        <span class="close" @click="closeGallery">&times;</span>

        <!-- Flèches de navigation -->
        <span class="prev" @click="prevImage">&#10094;</span>
        <span class="next" @click="nextImage">&#10095;</span>

        <!-- Image affichée -->
        <img :src="currentImage.src" class="fullscreen-image">
      </div>
    </div>
  `,
});

// Gallery 2 ------------------------------ //

app.component("photo-gallery2", {
  // reçoit le tableau
  props: ["images2"],
  data() {
    return {
      // Galerie est cachée au départ
      showGallery: false,
      // index de l'image actuellement afficher (donc invisible)
      currentIndex: 0,
    };
  },
  computed: {
    currentImage() {
      // retourne l'image actuellement afficher et utilise les images reçues
      return this.images2[this.currentIndex];
    },
  },
  methods: {
    // Ouvre la galerie
    openGallery(index = 0) {
      this.currentIndex = index; // Ouvre l'index
      this.showGallery = true;
    },
    // ferme la galerie
    closeGallery() {
      this.showGallery = false;
    },
    // passse a l'image suivante
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images2.length;
    },
    // passse a l'image precedente
    prevImage() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images2.length) % this.images2.length;
    },
  },
  // Partie visuelle de la composante vu (se qui s'affiche dans html)
  template: `
    <div>
      <!-- Bouton d'ouverture -->
      <div class="btnjouer">
        <button @click="openGallery()">Ouvrir la galerie</button>
      </div>

      <!-- Galerie plein écran -->
      <div v-if="showGallery" class="fullscreen-gallery">
        <span class="close" @click="closeGallery">&times;</span>

        <!-- Flèches de navigation -->
        <span class="prev" @click="prevImage">&#10094;</span>
        <span class="next" @click="nextImage">&#10095;</span>

        <!-- Image affichée -->
        <img :src="currentImage.src" class="fullscreen-image">
      </div>
    </div>
  `,
});

app.mount("#app");

// Animations Gsap

gsap.registerPlugin(ScrollToPlugin, SplitText, ScrollTrigger);

function getSamePageAnchor(link) {
  if (
    link.protocol !== window.location.protocol ||
    link.host !== window.location.host ||
    link.pathname !== window.location.pathname ||
    link.search !== window.location.search
  ) {
    return false;
  }

  return link.hash;
}

// Fonction pour faire defiler la page jusqua un element correspondant à un # (hash)
function scrollToHash(hash, e) {
  const elem = hash ? document.querySelector(hash) : false;
  if (elem) {
    if (e) e.preventDefault();
    gsap.to(window, { scrollTo: elem });
  }
}

// Si un lien href est dans la page courante, scroll la a la palce
document.querySelectorAll("a[href]").forEach((a) => {
  a.addEventListener("click", (e) => {
    scrollToHash(getSamePageAnchor(a), e);
  });
});

// scroll jusqua l'element qui a un hash
scrollToHash(window.location.hash);

gsap.from(".elementacceuil", {
  scrollTrigger: ".elementacceuil",
  y: 70,
  opacity: 0,
  duration: 1.7,
  ease: "power3.out",
});

gsap.from(".apropos img", {
  scrollTrigger: ".apropos img",
  scale: 0.95,
  opacity: 0,
  rotate: 15,
  duration: 1.4,
  ease: "back.out(1.7)",
});

gsap.from(".apropos-container", {
  scrollTrigger: ".apropos-container",
  x: -70,
  opacity: 0,
  duration: 1.7,
  ease: "power3.out",
});

gsap.from(".projectscontainer", {
  scrollTrigger: ".projectscontainer",
  y: 70,
  opacity: 0,
  duration: 1.7,
  ease: "power3.out",
});

gsap.from(".projets h2", {
  scrollTrigger: ".projets h2",
  y: 70,
  opacity: 0,
  duration: 2,
  ease: "power3.out",
});

gsap.to(".imagecompetences img", {
  scrollTrigger: ".imagecompetences img",
  opacity: 1,
  x: 0, // revient à sa position originale
  duration: 0.5,
  stagger: 0.2, // chaque image apparaît 0.3s après la précédente
  ease: "power2.out",
});

// Menu Burger

const burger = document.querySelector(".burger");
const navbar = document.querySelector(".navbar");
const overlay = document.querySelector(".overlay");

// Ouvrir / fermer menu burger
burger.addEventListener("click", () => {
  burger.classList.toggle("active"); // X
  navbar.classList.toggle("active"); // menu visible
  overlay.classList.toggle("active"); // fond flou
});

// Fermer menu si on clique sur le fond flou
overlay.addEventListener("click", () => {
  burger.classList.remove("active");
  navbar.classList.remove("active");
  overlay.classList.remove("active");
});

// Fermer le menu quand on clique sur un lien de la navbar
navbar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    navbar.classList.remove("active");
    overlay.classList.remove("active");
  });
});
