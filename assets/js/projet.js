//Récup l'id dans l'url
const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');


//Animation d'apparition
const intro = () => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll('.reveal');

    const tlIntro = gsap.timeline();

    tlIntro.to(sections, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        stagger: 0.03,
        ease: "power2.out",
    });
};

//Récup le json
fetch('./assets/js/projets.json')
    .then(res => res.json())
    .then(projects => {
        const project = projects.find(p => p.id == projectId);

        //id pas dans json, retour réalisations
        if (!project) {
            window.location.replace("realisation.html");
        }

        //Affichage dans le dom des infos principales
        document.querySelector('title').textContent = project.titre + " | NV";

        document.querySelector('#titre').textContent = project.titre;
        document.querySelector('#date').textContent = project.date;
        document.querySelector('#collab').textContent = project.collaboration;
        document.querySelector('#desc').textContent = project.description;

        document.querySelector('#item').src = project.capsule;

        if (project.soustitre) {
            document.querySelector('#subtitle').textContent = project.soustitre;
        }

        if (!project.langages) {
            document.querySelector('.dev').style.display = "none";
        } else {
            document.querySelector('#dev').textContent = project.langages;
        }

        if (!project.logiciels) {
            document.querySelector('.crea').style.display = "none";
        } else {
            document.querySelector('#crea').textContent = project.logiciels;
        }

        const list = document.querySelector('#liste');

        project.competences.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });

        //Lien d'accès au projet
        if (!project.lien) {
            document.querySelector('#lien').style.display = "none";
        } else {
            document.querySelector('#lien').href = project.lien;
        }

        //Navigation entre les projets
        if (project.id == projects.length) {
            document.querySelector('#suivant').style.display = "none";
        } else {
            document.querySelector('#suivant').href = "projet.html?id=" + (Number(project.id) + 1);
        }

        if (project.id == 1) {
            document.querySelector('#prev').style.display = "none";
        } else {
            document.querySelector('#prev').href = "projet.html?id=" + (Number(project.id) - 1);
        }

        //Image principale
        const visuel = document.querySelector('.img');
        //vidéos youtubes
        if (project.youtube) {
            visuel.innerHTML = project.youtube;

        } else if (project.image) {
            //REMPLACER PAR IMG
            document.querySelector('.visuel').src = project.image;
        }

        //Visuels complémentaires
        const container = document.getElementById("visuels");

        if (project.imgs) {
            project.imgs.forEach(src => {
                const image = document.createElement("img");
                image.src = src;
                image.loading = "lazy";
                image.classList.add("portfolio-img");
                container.appendChild(image);
            })
        }

        if (project.videos) {
            project.videos.forEach(src => {
                const video = document.createElement("video");

                // Configuration de base
                video.controls = true;
                video.loop = true;
                video.preload = "metadata";
                video.muted = true;
                video.loading = "lazy";
                video.src = src;

                video.classList.add("portfolio-video");

                container.appendChild(video);
            });
        }

        if (project.mag) {
            container.innerHTML = project.mag;
        }

        intro();
    })
    .catch(err => console.error("Erreur d'affichage :", err));