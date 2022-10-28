# Testez la fiabilité de votre produit
1.	Comprenez ce qu’est un produit fiable

-	Qu’est-ce qu’un produit fiable ?

```
•	Certaines organisations jugeront de la fiabilité du produit par son temps de réaction.
•	D’autres, par ses faibles bugs et sa capacité à être utilisable sur différents appareils.
•	D’autres, enfin, jugeront la qualité du code réalisé. 
```
Il est donc important d’avoir des lignes directrices pour mesurer la fiabilité d’un produit, en se demandant quel degré de “perfection” l’organisation souhaite atteindre, et à quel point un bug est gênant pour le produit.

-	Définissez des règles de fiabilité

Pour que l’ensemble de votre équipe soit aligné sur votre projet, vous définissez ensemble et le plus tôt possible des règles de fiabilité. Notez que ces règles vont pouvoir évoluer dans le temps.
Ces règles établiront à quel moment un bug est gênant et doit être corrigé, et à quel moment un test devra être réalisé.
____________________________________________________
2.	Testez sur différents navigateurs

Il est important que vous testiez votre code sur plusieurs navigateurs : 

```
•	Soit sur les principaux navigateurs du marché ;
•	Soit sur les navigateurs les plus utilisés par vos utilisateurs.
```
Si vous mettez en place une stratégie de tests, il est important de préciser que les navigateurs Chrome et Firefox devront être testés au moment du développement.
Si le projet doit répondre à des standards de qualité élevés, il est préférable de passer par des solutions automatisées. 

```
•	Des tests E2E, qui vous permettent de lancer Firefox et Google Chrome automatiquement, et de tester votre projet ;
•	Des solutions telles que AWS Device Farm. Ce service payant d’AWS vous permet de tester votre application sur un très grand nombre d’appareils, de manière automatisée.
```



____________________________________________________
3.	Mettez en place une CI

CI signifie Continuous Integration (ou intégration continue, en français). C’est un ensemble de pratiques et de logiciels permettant à un projet d’être testé constamment.
Cela permet aux développeurs d’être certains que le code qui va être déployé fonctionne correctement, et qu’il passe bien tous les tests réalisés. Il n’y a rien de pire qu’un produit qui casse à chaque nouvelle mise en production.
Vous allez découvrir comment mettre en place une CI avec [Travis CI]( https://www.travis-ci.com/)


```
Pour mettre en place cette compétence, vous aurez besoin des éléments suivants :
•	Votre code devra être hébergé sur GitHub, et devra être dans un repository public ;
•	Vous connecter à travis-ci.com.
```

- Voir fichier .travis.yml

Nous allons configurer Travis-CI pour qu’il teste les branches que nous souhaitons merger dans la branche main  .

De manière générale, c’est souvent le développeur senior, le lead dev ou le devops de l’entreprise qui se chargera de mettre la CI en place. Mais vous voilà désormais capable de le faire ! 


