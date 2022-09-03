# Projet L3 MIAGE

## Idée de base

Nous avons choisi de recréer un jeu semblable au célèbre jeu d'arcade "Asteroids" sorti en 1979.  
Le projet sera codé en JavaScript et les touches du clavier seront utilisées pour jouer.

## Description du projet

Nous avons défini quelques objectifs :
* D'abord réaliser le moteur de jeu basique
* Ajouter un système de monnaie
* Enfin, si possible, ajouter des ombres et des effets supplémentaires pour améliorer le rendu du jeu

En n'oubliant pas les règles de bases de ce jeu qui sont :

* Un vaisseau qui tir un laser sur des astéroides
* Lorsqu'un astéroide est touché par un laser, il se divise en 2 s'il est grand ou moyen
* Un système de score, mais également un système de stockage de score en local
* Avoir une ambiance rétro (Musique, sound effect, dessin pixelisé)

## Comment jouer 

Dans le ***menu***, pour se déplacer il suffit d'utiliser :

* Z pour monter dans le menu
* Espace pour valider le choix

En ***jeu***, il suffit de joeur avec :

* Z pour avancer
* Q pour tourner sur la gauche
* D pour tourner sur la droite
* Espace pour tirer

Le joueur a 3 vies, qui peuvent être vue en haut à droite de l'écran.

## But du jeu

Tirer sur un maximum d'astéroides pour accumuler des points et réaliser le meilleur score.
Avoir un bon score rapporte de l'argent, qui permet d'acheter des améliorations dans la boutique
Le joueur peut voir son score en temps réel en haut à droite de son écran.

## Boutique

Après un certain nombres de parties vous accumulerez assez de pièces pour pouvoir acheter de nouveaux vaisseaux.
Les nouveaux vaisseaux vous permettront d'avoir de meilleurs scores grâce à de nouvelles stats, comme une amélioration de vitesse, ou de vitesse de tir.

## Modules fonctionnels

* Vaisseau:
	* Déplacement
	* Tir
	* Collision
	* Apparance
	* Spécificité 
	* Particules
	* Vies
	* Invicibilité temporaire

* Astéroides:
	* Déplacement
	* Collision
	* Apparance
	* Particules 

* Boutique:
	* Système de devise
	* Achat de vaisseaux
	* Choix du vaisseau

* Score:
	* Stockage en local
	* Mis à jour 
	* Top 10 scores

* Jeu:
	* Menu 
	* Jeu qui tremble
	* Musique
	* Son
	* Jeu sans fin

## A faire

* Multijoueur en coopération en ligne [en cours]
* Menu pause
* Ajout de nouveaux vaisseaux
* Ajout de nouvelles musiques
* Ajout de nouveaux "mondes"

## Jeu 

Disponible sur https://billyledev.github.io/AsteroWorld/game.html

## Contributeurs du projet

    * Custodio Cavaco Samuel
    * La Selva Clément
    * Martin François
    
