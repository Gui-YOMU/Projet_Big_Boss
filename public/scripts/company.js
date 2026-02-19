document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burger');
    const navMenu = document.getElementById('nav');
    const navList = navMenu.querySelector('ul');

    burgerBtn.addEventListener('click', () => {
        // Alterne l'affichage du menu
        navMenu.classList.toggle('hidden');
        
        // Ajustements pour le mode mobile mobile
        // On force le menu à s'afficher en bloc sous le header si besoin
        navMenu.classList.toggle('absolute');
        navMenu.classList.toggle('top-20');
        navMenu.classList.toggle('right-0');
        navMenu.classList.toggle('w-full');
        navMenu.classList.toggle('bg-white'); // Optionnel : pour éviter la transparence
        navMenu.classList.toggle('border');
        navMenu.classList.toggle('rounded-md');
        
        // Alterne entre colonnes (mobile) et ligne (desktop)
        navList.classList.toggle('gap-4');
        navList.classList.toggle('p-5');
    });
});