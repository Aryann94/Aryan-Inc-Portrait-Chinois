document.addEventListener("DOMContentLoaded", (event) => {

  const portraitEL = document.querySelectorAll(".portrait-parallax");
  const heroSection = document.querySelector(".hero");
  const portraitBg1 = document.querySelector(".portrait-bg1");
  const portraitBg2 = document.querySelector(".portrait-bg2");
  const portraitBg3 = document.querySelector(".portrait-bg3");
  const portraitBg4 = document.querySelector(".portrait-bg4");
  const texte = document.querySelector(".titre-hero");

  let valeurX = 0,
    valeurY = 0;

  let degreRotation = 0;

  function updateParallaxMouse(posCurseur) {
    portraitEL.forEach((el) => {
      let vitesseX = el.dataset.speedx;
      let vitesseY = el.dataset.speedy;
      let vitesseZ = el.dataset.speedz;
      let vitesseRotation = el.dataset.rotation;

      let estAGauche =
        parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
      let valeurZ =
        (posCurseur - parseFloat(getComputedStyle(el).left)) * estAGauche * 0.1;

      el.style.transform = `perspective(2300px) translateZ(${
        valeurZ * vitesseZ
      }px) rotateY(${
        degreRotation * vitesseRotation
      }deg) translateX(calc(-50% + ${
        -valeurX * vitesseX
      }px)) translateY(calc(-50% + ${-valeurY * vitesseY}px))`;
    });  
  }
  updateParallaxMouse(0);

  heroSection.addEventListener("mousemove", (e) => {
    const boundingRect = heroSection.getBoundingClientRect();
    valeurX = e.clientX - boundingRect.left - boundingRect.width / 2;
    valeurY = e.clientY - boundingRect.top - boundingRect.height / 2;

    degreRotation = (valeurX / (window.innerWidth / 2)) * 20;

    updateParallaxMouse(e.clientX);
  });
  
  window.addEventListener("scroll", () => {
    let value = window.scrollY;

    texte.style.marginTop = value * 0.45 + "px";
    portraitBg1.style.marginTop = value * 1.8 + "px";
    portraitBg2.style.marginTop = value * 0.6 + "px";
    portraitBg3.style.marginTop = value * -0.15 + "px";
    portraitBg4.style.marginTop = value * -0.1 + "px";
  })

  window.addEventListener("scroll", () => {
    let value = window.scrollY;
  
    const screenWidth = 1920;
    const conversionFactor = window.innerWidth / screenWidth;
  
    texte.style.marginTop = value * 0.45 * conversionFactor + "px";
    portraitBg1.style.marginTop = value * 1.8 * conversionFactor + "px";
    portraitBg2.style.marginTop = value * 0.6 * conversionFactor + "px";
    portraitBg3.style.marginTop = value * -0.15 * conversionFactor + "px";
    portraitBg4.style.marginTop = value * -0.1 * conversionFactor + "px";
  })

  window.addEventListener("scroll", () => {
    let value = window.scrollY;
  
    const screenWidth = 1280;
  
    if (window.innerWidth > 1192) {
      const conversionFactor = window.innerWidth / screenWidth;
  
      texte.style.marginTop = value * 0.45 * conversionFactor + "px";
      portraitBg1.style.marginTop = value * 1.8 * conversionFactor + "px";
      portraitBg2.style.marginTop = value * 0.6 * conversionFactor + "px";
      portraitBg3.style.marginTop = value * -0.15 * conversionFactor + "px";
      portraitBg4.style.marginTop = value * -0.1 * conversionFactor + "px";
    } else {
      texte.style.marginTop = 0;
      portraitBg1.style.marginTop = 0;
      portraitBg2.style.marginTop = 0;
      portraitBg3.style.marginTop = 0;
      portraitBg4.style.marginTop = 0;
    }
  });
  






  // section jeu

  window.addEventListener("scroll", function () {
    const jeuSection = document.querySelector("#jeu");
    if (jeuSection) {
      const boundingBox = jeuSection.getBoundingClientRect();
      const verticalPosition = boundingBox.top + boundingBox.height / 1.5;
      const perspective = 2000 + verticalPosition * 2;
      jeuSection.style.perspective = `${perspective}px`;
  
      const scrollY = window.scrollY || window.pageYOffset;
      let rotationX = -(scrollY - verticalPosition) / 10;
  
      rotationX = Math.max(0, Math.min(
        70, rotationX));
  
      jeuSection.querySelector('.img').style.transform = `translate(-50%, -50%) rotateX(${rotationX}deg)`;
  
      // Ajouter l'effet d'opacité en fonction du défilement (inversé)
      const opacity = Math.max(0.01, Math.min(1, (scrollY - boundingBox.top) / 1000));
      jeuSection.querySelector('.img').style.opacity = opacity.toFixed(2);

    }
  });





  
  // Fonction pour réinitialiser l'effet Baffle
function resetBaffleEffect() {
  const textSelectors = ['#jeu .si-jetais', '#jeu .je-serais', '#jeu p'];

  textSelectors.forEach(selector => {
    let text = baffle(selector);
    text.set({
      characters: '░██ ▓/█░█ ░█░▓▓ /▒░ //█▒< ░█▓▓ █<< █▒>▓ ▒█//',
      speed: 120
    });
    text.start();
    text.reveal(2500);
  });
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Fonction pour démarrer l'effet Baffle une seule fois lorsque le texte est visible
function startBaffleEffectOnce() {
  resetBaffleEffect();

  // Retirer l'écouteur d'événements après la première exécution
  window.removeEventListener("scroll", scrollHandler);
}

// Événement de défilement
function scrollHandler() {
  const jeuTextElements = document.querySelectorAll('#jeu .si-jetais, #jeu .je-serais, #jeu p');

  // Vérifier si au moins un des éléments texte de la section '#jeu' est visible
  if (Array.from(jeuTextElements).some(isElementInViewport)) {
    startBaffleEffectOnce();
  }
}

// Ajouter l'écouteur d'événements de défilement
window.addEventListener("scroll", scrollHandler);












    document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);

          // Défilement doux vers la section cible
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop,
                  behavior: 'smooth'
              });
          }

          // Fermez le dropdown s'il est ouvert
          const dropdownContent = this.nextElementSibling;
          if (dropdownContent && dropdownContent.classList.contains('show')) {
              dropdownContent.classList.remove('show');
          }
      });
  });

  // Gérez l'affichage/la masquage du dropdown au survol
  document.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.addEventListener('mouseenter', function () {
          this.querySelector('.dropdown-content').classList.add('show');
      });

      dropdown.addEventListener('mouseleave', function () {
          this.querySelector('.dropdown-content').classList.remove('show');
      });
  });




  




  window.addEventListener("scroll", function () {
    const heroSection = document.querySelector('.hero');
    const gradientOverlay = document.querySelector('.gradient-overlay');

    if (heroSection && gradientOverlay) {
        const scrollPosition = window.scrollY || window.pageYOffset;
        const maxScroll = heroSection.offsetHeight - window.innerHeight;

        // Vérifiez si la position de défilement est en haut de la page
        if (scrollPosition === 0) {
            gradientOverlay.style.height = '0';
        } else {
            // Calculez la hauteur du gradient en fonction du défilement
            const gradientHeight = Math.max(0, Math.min(1, scrollPosition / maxScroll)) * 30;

            // Appliquez la hauteur calculée avec la transition
            gradientOverlay.style.height = `${gradientHeight}%`;
        }
    }
  });






  document.querySelectorAll(".item").forEach(item => {
      item.addEventListener("mousemove", applyOverlayMask);
      item.addEventListener("mouseleave", resetOverlay);

      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      item.appendChild(overlay);
  });

  function applyOverlayMask(e) {
      const overlay = e.currentTarget.querySelector(".overlay");
      const x = e.pageX - e.currentTarget.offsetLeft;
      const y = e.pageY - e.currentTarget.offsetTop;

      overlay.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
  }

  function resetOverlay(e) {
      const overlay = e.currentTarget.querySelector(".overlay");
      overlay.style = "--opacity: 0;";
  }

  










  /*
  document.querySelector('.div-couleur-2').addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    document.querySelector('.text-section').style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });
  
  document.querySelector('.div-couleur-2').addEventListener('mouseleave', () => {
    document.querySelector('.text-section').style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
  */
  















  






  



  var sectionInternaute = document.querySelector(".section-internaute");
  var analogie = document.getElementById("analogie");
  var valeurAnalogie = document.getElementById('valeur-analogie');
  var boutonEnvoyer = document.getElementById('boutonEnvoyer');
  
  analogie.addEventListener("keyup", (event) => {
      console.log(analogie.value);
      sectionInternaute.innerHTML = analogie.value;
  })

  valeurAnalogie.addEventListener("keyup", (event) => {
    console.log(analogie.value);
    sectionInternaute.innerHTML = valeurAnalogie.value;
})


boutonEnvoyer.addEventListener('click', (event) => {
    var url = 'https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json';
    url += '&login=aryan';
    url += '&courriel=philippe.gambette@univ-eiffel.fr';
    url += '&message=' + encodeURIComponent(analogie.value + ' ' + valeurAnalogie.value);

    console.log('URL à envoyer : ' + url);
    
});









function openPopup() {
  document.getElementById('creditsPopup').style.display = 'block';
  document.getElementById('closeButton').addEventListener('click', closePopup);
}

function closePopup() {
  document.getElementById('creditsPopup').style.display = 'none';
  document.getElementById('closeButton').removeEventListener('click', closePopup);
}

document.getElementById('creditsButton').addEventListener('click', openPopup);









  fetch('analogies.json')
  .then(response => response.json())
  .then(data => {
    var numCase = 0;
    var listeAnalogies = document.querySelector('.liste-analogies');

    data.forEach(element => {
      numCase++;

      var codeDuBloc;

      if (element.id === 'saison') {
        codeDuBloc =
          '<section id="{{id}}" data-bg="{{dataBg}}">' +
          '<div class="grid">' +
          '<div class="grid-container">' +
          '<div class="item item1 hidden">' +
          '<div class="overlay"></div>' +
          '<img src="{{image}}" alt="Image">' +
          '</div>' +
          '<div class="item item2 hidden">' +
          '<div class="overlay"></div>' +
          '<p>Si j\'étais {{analogies}}</p>' +
          '</div>' +
          '<div class="item item3 hidden">' +
          '<div class="overlay"></div>' +
          '<p>Je serais {{valeursAnalogies}}</p>' +
          '</div>' +
          '<div class="item item4 hidden">' +
          '<div class="overlay"></div>' +
          '<p>{{description}}</p>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</section>';
      } else {
        codeDuBloc =
          '<section id="{{id}}">' +
          '<div class="{{class1}}"></div>' +
          '<div class="{{class2}}">' +
          '<div class="text-section hidden">' +
          '<h2>' +
          '<span class="si-jetais">Si j\'étais <span class="analogie">{{analogies}}</span></span><br>' +
          '<span class="je-serais"> Je serais <span class="valeurAnalogie">{{valeursAnalogies}}</span></span>' +
          '</h2>' +
          '<p>{{description}}</p>' +
          '</div>' +
          '<div class="img-container hidden">' +
          '<img class="img" src="{{image}}" alt="{{alt}}">' +
          '</div>' +
          '</div>' +
          '</section>';
      }

      codeDuBloc = codeDuBloc.replace('{{id}}', element.id);
      codeDuBloc = codeDuBloc.replace('{{class1}}', element.class + '-1');
      codeDuBloc = codeDuBloc.replace('{{class2}}', element.class + '-2');
      codeDuBloc = codeDuBloc.replace('{{analogies}}', element.analogies);
      codeDuBloc = codeDuBloc.replace('{{valeursAnalogies}}', element.valeursAnalogies);
      codeDuBloc = codeDuBloc.replace('{{description}}', element.description);
      codeDuBloc = codeDuBloc.replace('{{image}}', element.image);
      codeDuBloc = codeDuBloc.replace('{{alt}}', element.alt);
      var blocHTML = new DOMParser().parseFromString(codeDuBloc, 'text/html').body.firstChild;

      listeAnalogies.appendChild(blocHTML);
    });

    VanillaTilt.init(document.querySelector('.div-couleur-2'), {
      max: 5,
      speed: 100,
      glare: true,
      "max-glare": 0.5,
      "glare-prerender": "#ff0000"
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      })
    }, { threshold: 0.05 })
  
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    const fruitSection = document.getElementById('fruit');

    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                fruitSection.classList.add('show-neomorphism');
            } else {
                fruitSection.classList.remove('show-neomorphism');
            }
        });
    }, { threshold: 0.5 });

    observer2.observe(fruitSection);
  })

  .catch(error => console.error('Erreur de chargement des données :', error));
  })
