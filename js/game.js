//Fonction appelée à la fin du chargement du DOM
window.addEventListener('load', () => {
    //On récupère l'élément canvas
    let canvas = document.querySelector('canvas');

    //La largeur et hauteur du canvas
    let width = canvas.width;
    let height = canvas.height;

    //On créé un contexte 2D à partir du canvasÒ
    let ctx = canvas.getContext('2d');



    //Gère l'initialisation du jeu
    function init()
    {
        animate();
    }

    //Gère le dessin du jeu
    function animate()
    {
        ctx.clearRect(0, 0, width, height);

        requestAnimationFrame(animate);
    }



    //On appelle la fonction d'initialisation
    init();
});