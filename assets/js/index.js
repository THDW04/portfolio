gsap.registerPlugin(ScrollTrigger);

//Animations GSAP
const initAnimations = (projects) => {
    // 1. GESTION DES CARTES COMPÉTENCES (STACKING)
    let mm = gsap.matchMedia();
    const cards = gsap.utils.toArray('.comp');

    mm.add({
        //les conditions
        isMobile: "(max-width: 1199px)",
        isDesktop: "(min-width: 1200px)"
    }, (context) => {
        let { isMobile, isDesktop } = context.conditions;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: isDesktop ? ".about" : ".competences", // choix de trigger
                start: "top 5%",
                end: `+=${cards.length * 100}%`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true, // Important pour le responsive
            }
        });

        cards.forEach((card, index) => {
            // Animation d'entrée
            tl.fromTo(card,
                { y: "100vh", opacity: 0.5 },
                {
                    y: index * 10, // Léger décalage pour l'empilement
                    duration: 1,
                    opacity: 1,
                    ease: "none"
                },
                index * 0.8
            );

            // Effet de réduction sur la carte précédente
            if (index > 0) {
                tl.to(cards[index - 1], {
                    scale: 0.9,
                    duration: 0.5
                }, index * 0.8);
            }
        });
    });

    // 2. ANIMATIONS DES CAPSULES PROJETS (APPELÉES APRÈS LE FETCH)
    const capsules = document.querySelectorAll(".capsule");
     if (capsules.length > 0) {
         const tlProjets = gsap.timeline({
             scrollTrigger: {
                 trigger: ".realisation",
                 start: "top top", // Déclenchement plus tôt sur mobile
             }
         });
 
         tlProjets.fromTo(capsules,
             { opacity: 0, x: "100%" },
             {
                 opacity: 1,
                 x: 0,
                 duration: 1.1,
                 stagger: 1.1,
                 ease: "power2.out",
                 onComplete: () => capsules.forEach(c => c.style.pointerEvents = "auto")
             }
         )
             .fromTo(".capsule h2, .capsule p",
                 { opacity: 0, y: 20 },
                 { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
                 "-=1"
             );
     }
 

    ScrollTrigger.refresh();
};

//Projets
const genererProjets = async () => {
    try {
        const res = await fetch('./assets/js/projets.json');
        const projects = await res.json();
        const section = document.querySelector('.projets');

        if (!section) return;

        section.innerHTML = projects.filter((p, index) => {
            return index === 2 || index === 4 || index === 6;
        }).map(p => `
            <div class="capsule" pointer-events: none;">
                <a href="projet.html?id=${p.id}">
                    <video autoplay loop muted playsinline>
                        <source src="${p.videos[0]}" type="video/webm">
                        Votre navigateur ne supporte pas cette vidéo.
                    </video>
                    <h2>${p.titre}</h2>
                    <p>${p.categorie}</p>
                </a>
            </div>
        `).join('');

        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.playbackRate = 2.0; // Vitesse x2
        });

        // On lance TOUTES les animations ici
        initAnimations(projects);

    } catch (err) {
        console.error("Erreur Fetch :", err);
    }
};

window.onload = genererProjets;