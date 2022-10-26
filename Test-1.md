# Mettez en place votre environnement de test


1. Mettez en place votre environnement de développement

- Cloner le [repository GitHub](https://github.com/OpenClassrooms-Student-Center/testez-vos-applications-front-end-avec-javascript).
- Extension LiveServer (VSCode) : Nous l’utiliserons pour lancer un serveur afin de faciliter notre développement
- Extension Jest (VSCode) : Elle affichera directement depuis VSCode les tests qui passent et ceux qui ne passent pas.

____________________________________________________


2. Découvrez le projet fil rouge

```
Notre projet fil rouge permet de suivre des façades par le biais de capteurs. Ces capteurs nous donnent des informations telles que le degré d’humidité ou les coordonnées géographiques. Grâce à l’API WeatherCast et aux coordonnées GPS de chaque capteur, nous récupérons les données météorologiques pour chaque façade.
```
```
Le projet comporte quatre pages :
•	Une page de connexion où on va devoir rentrer son adresse e-mail et son mot de passe ;
•	La page d’accueil, qui comprend 34 capteurs récupérés via une requête HTTP ;
•	La page “façade”, qui donne des détails sur une façade ;
•	La page d’ajout d’une façade. Elle comprend un formulaire.
```

Pour ce projet, vous aurez besoin de créer un compte sur l’[API WeatherCast](https://weatherstack.com/). Vous pouvez créer un compte gratuit, cela suffira amplement pour le nombre de requêtes que nous allons faire. 

____________________________________________________

3. Écrivez votre premier test

Le principe de ce test va surtout être de vous assurer que tout va bien, et que tout a été installé comme il faut. 
S’assurer que tout va bien et que tout a bien été installé est souvent une étape oubliée lors du développement d’un projet. Le plus souvent, on installe tout, on crée nos architectures et on lance son premier test uniquement après avoir plusieurs dizaines de lignes de code.
Le problème, c’est que ce test échoue 99 % du temps, et que vous allez perdre du temps à déboguer pour comprendre d’où peut venir le problème. Cela peut être dû à une librairie que vous avez mal paramétrée, ou à des fichiers avec des erreurs. En fait, vous aurez multiplié les sources de problème potentielles, et vous devrez détricoter le tout pour comprendre où ça coince.

- fichier js/samples/unit/unit1.js

```
/**
 * 
 * @param {string} name 
 */
export const sayHello = name => {
    if (!name) {
        return "Hello, World"
    }

    return `Hello, ${name}`
}
```

- fichier js/samples/unit/unit1.test.js


```
import { sayHello } from './unit1'

describe('Hello test', () => {
    it('should return "Hello, World"', () => {
        expect(sayHello()).toBe("Hello, World")
    })
    
    it('should be "Hello, Valentin"', () => {
        expect(sayHello("Valentin")).toBe("Hello, Valentin")
    })
})
```

# Adoptez une posture de test efficace

1. Dédramatisez vos erreurs

- En informatique, le produit parfait n’existe pas. De la même manière, le produit sans bug n’existe pas non plus.
Les bugs et les erreurs sont donc omniprésents en développement informatique. Nous en ajoutons régulièrement au fur et à mesure que notre produit évolue, et c’est parfaitement normal. 
- Si votre projet ne comporte que quelques pages et quelques lignes de code, vous allez pouvoir réaliser des tests “à la main”. Contrairement à ce qu’on pense, ça arrive très souvent, et c’est totalement normal. Pour faire simple, vous allez prendre le temps de tester chaque fonctionnalité pour voir si rien n’a cassé.
- Mais imaginez que votre projet comporte des centaines de milliers de lignes de code, et qu’il fasse énormément de choses à la fois. Dans ce type de situation, mettre en place des tests automatisés devient obligatoire, sinon vous courez le risque d’avoir de gros bugs.

____________________________________________________

2. Surveillez la qualité de votre produit

Selon Wikipedia, la qualité logicielle est un examen ; on pourrait aussi dire un bilan ou une étude globale d’un logiciel basé sur de nombreux facteurs, tels que :

```
•	La fiabilité. Autrement dit, est-ce que votre produit comporte des bugs ? Est-ce que ces derniers sont gênants ? 
•	La facilité d’utilisation. Par exemple, votre produit est-il utilisable par des personnes malvoyantes, ou qui ne parlent pas votre langue ?
•	La maintenabilité. Autrement dit, est-ce que votre logiciel est capable d’être mis à jour et développé facilement ?
•	La compatibilité. Par exemple, est-ce que votre site est utilisable par différents navigateurs du marché ou par différents appareils ?
```
Fort heureusement, il existe plusieurs outils qui vont vous permettre de suivre l’évolution de la qualité de votre code.

-	Découvrez le code coverage

```
Ce dernier est directement présent avec Jest.
Le principe du code coverage est de vous donner le pourcentage de code couvert par des tests. C’est un outil assez puissant qui va vous indiquer les lignes, ainsi que les fichiers, qui ne sont pas testés.
Cela dit, attention, ce n’est pas parce que vous avez un pourcentage de couverture élevé que vos tests sont pertinents ! C’est une erreur assez classique quand on découvre pour la première fois l’indicateur.
```
-	Découvrez d’autres outils relatifs au suivi de la qualité


```
Les systèmes de tickets correspondent à la gestion des remarques et des réclamations. En fonction du nombre de tickets reçus par jour, ainsi que des types remontés (questions sur le produit, ou bugs, par exemple), vous allez pouvoir avoir une idée de la qualité de votre produit.
```

```
Le monitoring est une autre solution très répandue dans le monde des entreprises. Grâce à des dashboards et des alertes par mail, vous allez pouvoir suivre l’état de votre infrastructure et de votre application. Ce type de service pourra vous alerter si une erreur arrive trop régulièrement.
```
-	Pourquoi la qualité est importante ?


```
En fonction du produit que vous développez ainsi que de la base d’utilisateurs que vous avez, la notion de qualité logicielle peut être foncièrement différente.
De manière générale, plus votre service est “vital”, c’est-à-dire soit qu'il dégage beaucoup d’argent, soit qu'il est utilisé par beaucoup de personnes, plus le niveau de qualité doit être élevé !
```
____________________________________________________

3. Réalisez votre premier code coverage

package.json : 
```
  "scripts": {
    "test": "jest",
    "test-coverage": "jest --coverage" 
  },
```
Terminal :
```
npm run test-coverage
```
Résultat : 
- Par exemple le fichier unit1.js = 100 % de couverture de code

Mais si nous modifions la fonction sayHello() du fichier unit1.js en : 

```
export const sayHello = name => {
if (!name) {
return "Hello, World"
}
// J'ajoute ici cette ligne dans ma fonction
if (name === "Valentin") {
return "Bonjour Valentin"
}
return `Hello, ${name}`
}
```
Le test coverage n'est plus à 100% 
```
return "Bonjour Valentin"
```
n'est pas testé. (numéro de lignes non testées = uncovered lines)


# Adaptez vos tests en fonction du cycle de vie de votre produit
Quand écrire ses tests ? 
Écrire des tests et du “beau code” va souvent dépendre de la phase dans laquelle se trouve votre produit.

1. Découvrez le cycle de développement logiciel
```
Le cycle de vie d’un produit correspond à l’ensemble de toutes les phases qu’un produit traverse, de sa conception à sa sortie sur le marché. 
Ces phases sont : 
-	L’idée, 
-	Le développement, 
-	Le lancement, 
-	La croissance, 
-	La maturité,
-	Le déclin.
```
-	Le POC (ou Proof of Concept)

```
Cette phase correspond au début de la création d’un projet. Votre projet peut être un site web ou une application mobile. À ce moment-là, il n’y a que très peu de développeurs travaillant sur le projet.
Dans cette phase, on va écrire du code qu’on n’aura aucune honte à supprimer si le concept ne marche pas. Il y a donc très souvent peu, voire aucun test.
Ces premiers mois d’utilisation permettent de se faire une meilleure idée de la manière dont le projet va se comporter dans le temps.
```
-	La croissance

```
Dans cette phase, le produit a trouvé son public et commence à faire parler de lui. La croissance est exceptionnelle et le nombre d’utilisateurs, de votre application par exemple, bat des records de jour en jour.
C’est souvent à partir de ce moment que vous allez devoir intégrer vos premiers tests. C’est une période assez complexe dans la vie d’une entreprise. Vous allez devoir alterner entre sortir de nouvelles fonctionnalités et structurer l’architecture de votre projet.
On va maintenant chercher à rendre l’application stable.
```
-	Vers la maturité et au-delà 

```
Enfin, dernière phase du cycle de vie : la maturité. À ce moment-là, votre projet marche maintenant bien et a trouvé son rythme de croisière. Les fonctionnalités qui vont sortir vont être de plus en plus complexes, et le besoin de refactoriser du code va se faire de plus en plus sentir.
C’est l’heure maintenant de faire des tests plus complexes (Quality Assurance)
Un haut niveau de qualité est devenu critique, et il faut donc développer de nouveaux tests automatisés et une architecture robuste dans ce sens.
```
____________________________________________________
2. Identifiez le test à adopter

En développement logiciel, il existe de très nombreux tests possibles. Vous pouvez réaliser des tests unitaires, des tests fonctionnels ou d’intégration, des tests End-To-End (ou E2E), des Smoke Tests, des Snapshot Tests, etc.
Certains sont plus complexes à mettre en place que d’autres, et leur implémentation va dépendre de la phase du cycle de vie dans laquelle se trouve votre produit, ainsi que des technologies utilisées.
Par exemple, dans l’écosystème React, on utilise beaucoup les tests de snapshots, alors qu’on en utilise assez peu sur des projets back-end.



```
Voici les tests les plus courants :
•	Les tests unitaires – ce sont souvent les premiers à être implémentés dans une base de code. On les ajoute à partir du moment où le produit a trouvé sa cible. Ils sont généralement “assez faciles” à réaliser.
•	Les tests fonctionnels ou d’intégration – on les ajoute souvent soit en même temps que les tests unitaires, soit après. Ils vont être un peu plus complexes à réaliser.
•	Les tests E2E ou End 2 End – ce sont des tests assez complexes, qui seront souvent réservés à la phase de maturité du projet.
```

____________________________________________________

3. Définissez votre stratégie de test

La règle d’or est de se poser le maximum de questions en amont, que ce soit avec les autres développeurs ou avec l’équipe Produit. Comme ça, une fois que vous serez devant votre code, vous pourrez vous focaliser sur l’essentiel : le code.

-	Découvrez la stratégie de test

```
La stratégie de test est une ligne directrice à suivre pour atteindre l’objectif de test et l’implémentation des différents types de tests mentionnés dans le plan de test. Ce document est généralement réalisé par le Product Manager (ou chef de projet, en français). On y traite de l’objectif du test, de l’environnement dans lequel ce dernier est réalisé, de l’approche, et des outils qui vont être utilisés.
C’est un document “statique” ; autrement dit, il ne va pas changer durant le cycle de vie du projet. C’est un document qui va guider l’équipe, notamment dans la rédaction des plans de test.

Il est important d’y parler des éléments suivants :
•	La portée des tests : l’idée ici est de savoir ce qu’il faut tester, et pourquoi il faut le tester.
•	L’approche des tests : vous allez parler des types de test (unitaire, intégration, etc.), des responsabilités des différents membres de l’équipe, etc.
•	Les outils de test : par exemple Jest pour les tests unitaires JavaScript, et NightWatch pour les tests end to end.
```


[Stratégie de test vierge](https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fs3.eu-west-1.amazonaws.com%2Fcourse.oc-static.com%2Fcourses%2F7159306%2FStrate%25CC%2581gie%2Bde%2Btest_template.odt&wdOrigin=BROWSELINK) 

[Solution]( https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fs3.eu-west-1.amazonaws.com%2Fcourse.oc-static.com%2Fcourses%2F7159306%2FStrate%25CC%2581gie%2Bde%2Btest_Facadia.odt&wdOrigin=BROWSELINK)


-	Écrivez un plan de test

```
À la différence d’une stratégie de test, un plan de test est un document dynamique ; autrement dit, c’est un document qui va être régulièrement mis à jour. L’objectif est de décrire ce qu’il faut et ce qu’il ne faut pas tester, comment et quand tester, et enfin qui fera le test. C’est généralement un document qui est écrit par un QA Engineer.

Si la stratégie de test est le document qui donne les grandes lignes (vision globale), le cas de test est le document que vous allez réaliser pour vérifier qu’une fonctionnalité répond bien aux attentes (vision spécifique). Grâce à ce document, l’ingénieur de test va pouvoir comparer les résultats attendus aux résultats réels.
```

[Plan de test vierge](https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fs3.eu-west-1.amazonaws.com%2Fcourse.oc-static.com%2Fcourses%2F7159306%2FPlan%2Bde%2Btest_Facadia.odt&wdOrigin=BROWSELINK)

Enfin, pour finir, [modèle de cas de test](https://www.guru99.com/test-case.html) pour réaliser vos tests.