# Travail à faire

Voici la totalité du contenu à produire durant ce projet. Ce document servira à la répartition des tâches durant le projet.

Il contient les différentes resources, le découpage logique du travail à faire, ...

---

## Déplacement

Le joueur pourra interagir avec son environnement avec les touches z, q, s et d.

La touche z permettra d'avancer, les touches q et d d'orienter le vaisseau et la touche s de tirer.

Quand le vaisseau sort de la carte par un côté il réapparait au côté opposé.

---

## Moteur physique

Nous voulons simuler au mieux l'espace et donc l'absence de gravité. Une partie du projet sera donc consacrée à reproduire un moteur physique similaire à celui présent sur la version originale du jeu Asteroids.

---

## Ressources graphiques

### Sprites à réaliser

Les sprites peuvent être des images au format png (pour les graphismes les plus complexes) ou simplement des formes en JavaScript.

Liste des sprites à réaliser :
* Vaisseau
  * Vaisseau à l'arrêt
  * Vaisseau en déplacement (flamme à l'arrière)
* Tir
* Asteroïdes
  * Grand
  * Moyen
  * Petit
* Pièce de monnaie
* Bonus
  * Tir rapide
  * Invincibilité
  * Destruction instantanée

### Fonds à réaliser

Les fonds seront des dessins réaliser en JavaScript.

Liste des fonds à réaliser :
* Espace basique

---

## Moteur graphique

Notre jeu sera en 2D. Nous pourrons donc utiliser les fonctions de dessin basiques qui viennent avec l'utilisation d'un contexte 2D.

Nous avons aussi prévu d'implémenter un système de lumière. Pour cela, nous avons prévu d'utiliser un système de normal mapping réalisé avec les shaders OpenGL.

---

## Mécaniques de jeu

### Principe de base

L'utilisateur se déplace dans la carte et tir sur les astéroïdes. Si un tir atteint un astéroïde et que ce dernier n'est pas un petit astéroïde, il se divise en deux astéroïdes plus petits. Si un tir atteint un petit astéroïdes, ce dernier est détruit et l'utilisateur gagne 5 pièces.

Un utilisateur a trois vie au début de la partie. Quand il entre en collision avec un astéroïde, ce dernier perd une vie. Si il perd toutes ses vies, alors la partie est perdue et il est amené à entrer son nom pour apparaitre dans le classement des meilleurs scores.

### Bonus

Les bonus permettent, pendant un temps limité, d'augmenté les capacités de l'utilisateur.

Voici la liste actuelle des bonus avec leur caractéristiques :
* Tir rapide : le nombre de tir est doublé pendant 10 secondes
* Invincibilité : le vaisseau devient insensible aux chocs avec les astéroïdes pendant 10 secondes
* Destruction instantanée : un tir suffit à détruire instantanément toute taille d'astéroïde pendant 10 secondes