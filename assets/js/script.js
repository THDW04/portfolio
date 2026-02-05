// Gestion du menu Burger
const burger = document.getElementById('burger');
const navList = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navList.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navList.classList.remove('active');
    });
});