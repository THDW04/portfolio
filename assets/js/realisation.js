gsap.registerPlugin(ScrollTrigger);

//Animation pour le titre
function waveTitleAnimation() {
    const titre = document.querySelector('h1 span[aria-hidden="true"]');

    titre.innerHTML = titre.textContent
        .split('')
        .map(char => `<span>${char}</span>`)
        .join('');

    gsap.fromTo(
        titre.querySelectorAll('span'),
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.09,
            ease: "power2.out"
        }
    );

}

//Animation d'apparition des capsules
const intro = () => {
    const sections = document.querySelectorAll('.reveal');

    const tlIntro = gsap.timeline();

    tlIntro.to(sections, {
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
    });
};

//Récup le json
fetch('./assets/js/projets.json')
    .then(res => res.json())
    .then(projects => {
        const section = document.querySelector('.projets');

        //affichage dans le dom
        let htmlContent = "";
        projects.forEach(project => {
            htmlContent += `
            <div class="capsule reveal">
                <a href="projet.html?id=${project.id}">
                    <img src="${project.capsule}" alt="">
                    <h2>${project.titre}</h2>
                    <p>${project.categorie}</p>
                </a>
            </div>
            `;
        });

        section.innerHTML = htmlContent;

        intro();
    })
    .catch(err => console.error("Erreur d'affichage :", err));

document.addEventListener("DOMContentLoaded", waveTitleAnimation);