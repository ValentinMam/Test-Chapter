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


# Réalisez des tests End-to-End
1.	Découvrez les tests E2E

Les tests End-to-End (ou E2E) sont souvent la dernière étape dans le processus de test d’une application. 
```
Les tests E2E vérifient l’intégralité d’une application, du début, par exemple l’arrivée sur la page d’accueil et la phase de connexion, jusqu’à la fin. 
Ils permettent de voir si l’application répond correctement.
```

Aujourd’hui, les applications sont des systèmes complexes qui sont interconnectés avec de nombreux sous-systèmes. Si l’un de ces sous-systèmes tombe en panne, c’est l’ensemble de l’application qui casse.

```
Plus un projet est complexe, plus il peut comprendre de sous-systèmes : 
•	Au système de caching, c’est-à-dire le système qui permet de ne pas avoir à requêter la base de données pour des données fréquemment demandées ;
•	Au système d’authentification, c’est-à-dire ce qui permet à l’utilisateur de créer un compte et de s’authentifier. Vous pouvez ici passer soit par des librairies, soit par des outils totalement automatisés tels qu’AWS Cognito.
```


```
Enfin, les tests E2E peuvent être :
•	Soit manuels. Autrement dit, quelqu’un de l’équipe, le développeur ou le Product Manager, va tester à la main la fonctionnalité, et regarder que le reste du projet n’a pas été cassé. Dans ce type de cas, il va utiliser un cas de test ;
•	Soit automatiques. Autrement dit, le développeur va développer le test automatisé. En plus de faire passer le test sur la CI, il peut être intéressant de faire tourner ces tests à intervalles réguliers sur des serveurs ; par exemple, de rejouer les tests chaque heure, ou deux fois par jour. Cela permettra de rapidement voir si quelque chose ne marche pas comme prévu.
```


____________________________________________________
2.	Élaborez votre cas de test


```
Chaque cas de test est souvent composé :
•	D’une situation de départ (le Given). Cette situation permet de préciser d’où vous débutez ;
•	D’une action (le When). Cela peut-être une action réalisée par l’utilisateur, ou un paramètre passé à une fonction ;
•	D’un résultat (le Then), autrement dit comment doit se comporter l’application ou le code face à telle ou telle action.
```
Finalement, un cas de test est très proche d’une User Story.

____________________________________________________
3.	Utilisez Nightwatch pour réaliser vos tests E2E

Pour réaliser des tests E2E automatisés, nous allons avoir besoin d’un framework de test E2E. Ici, nous utiliserons Nightwatch.

Nightwatch est un framework de test E2E écrit en NodeJS, et utilisé par l’API WebDriver. 
Il est assez simple à prendre en main et à utiliser, s'intègre parfaitement à l’écosystème “testing library”, et [sa documentation](https://nightwatchjs.org/) est plutôt claire. 



-	Issue spécialement dédiée à [Nightwatch issue1](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/courses/7159306/Issue1.png)

Pensez à effectuer votre test sur le navigateur Chrome ou Firefox.



# Identifiez les tests à réaliser par d’autres intervenants

1.	Découvrez les tests QA

```
Les tests automatisés ne sont pas une fin en soi. 
En effet, ils ne sont qu’une des briques de l’édifice vous permettant d’atteindre un niveau de qualité suffisant. 
Quand une fonctionnalité est réalisée et s’apprête à être mise en production, on réalise souvent des tests dits QA, ou Quality Assurance (assurance qualité, en français). 
Ces derniers sont très proches des tests E2E, mais peuvent être réalisés par des équipes dédiées.
Si vous êtes dans une petite entreprise, il est possible que ce soient les développeurs ainsi que le Product Owner/Product Manager qui soient chargés de les réaliser.
```


____________________________________________________
2.	Découvrez les autres types de tests


-	Les Smoke Tests

```
Les Smoke Tests, ou tests de survie (ou aussi tests de fumée), sont des tests qui contrôlent les comportements critiques de votre application. S'ils ne passent pas, l’application ne peut pas être déployée.
Ces tests permettent par exemple de voir si toutes les pages de votre application sont bien accessibles. Ils pourraient être utilisés dans le cadre de notre projet fil rouge. Cela dit, on s’en sert le plus souvent sur un projet qui comporte plusieurs dizaines de pages ou d’URL.
```

-	Les Snapshot Tests

```
Les snapshot tests sont très utilisés dans l'écosystème front-end : ils permettent de tester si un élément a changé. C'est-à-dire qu'ils vont se comporter comme une empreinte digitale, et vous avertir si cette empreinte a changé depuis la dernière fois.
On va le plus souvent se servir de tests de snapshot pour des fonctions qui n’utilisent pas de paramètre et qui “se contentent” d’afficher du HTML.
```

Le code de l’en-tête =  js/common/header  , est un bon exemple :

```
const Header = {
    render: () => {
        return `
        <header class="main-header">
            <h1 class="main-header-title">
                <a href="#/home">Façadia</a>
            </h1>

            <ul class="main-nav">
                <li class="main-nav-item">
                    <a class="main-nav-link" href="#/home">Accueil</a>
                </li>

                <li class="main-nav-item">
                    <a class="main-nav-link" href="#">Le projet</a>
                </li>

                <li class="main-nav-item pr">
                    <a class="main-nav-link" href="#/add-sensor">Ajouter un capteur</a>
                </li>

                <li class="main-nav-item">
                    <a class="main-nav-link" href="/">Se Déconnecter</a>
                </li>
            </ul>
        </header>
`

    }
}
```

Pour réaliser un snapshot test, vous allez utiliser Jest et utiliser la méthode toMatchInlineSnapshot  .


```
import Header from "./index.js"

describe('Header Snapshot Test Suites', () => {
    it('should match snapshot', () => {
        expect(Header.render()).toMatchInlineSnapshot()
    })
})
```

Une fois que le test sera passé, Jest va ajouter automatiquement du code pour vous à l’intérieur de la méthode toMatchInlineSnapshot  .

```
expect(Header.render()).toMatchInlineSnapshot(`

"
    <header class=\\"main-header\\">
        <h1 class=\\"main-header-title\\">
            <a href=\\"#/home\\">Façadia</a>
        </h1>

        <ul class=\\"main-nav\\">
            <li class=\\"main-nav-item\\">
                <a class=\\"main-nav-link\\" href=\\"#/home\\">Accueil</a>
            </li>

            <li class=\\"main-nav-item\\">
                <a class=\\"main-nav-link\\" href=\\"#\\">Le projet</a>
            </li>

            <li class=\\"main-nav-item pr\\">
                <a class=\\"main-nav-link\\" href=\\"#/add-sensor\\">Ajouter un capteur</a>
            </li>

            <li class=\\"main-nav-item\\">
                <a class=\\"main-nav-link\\" href=\\"/\\">Se Déconnecter</a>
            </li>
        </ul>

    </header>
"
`)
```

Essayez de changer le code du header, en supprimant par exemple le code contenu dans l’une des balises li , et vous allez voir que votre test va échouer. 

```
 Pour régénérer le snapshot, vous avez deux options :
•	Utiliser la commande node_modules/.bin/jest -u :
•	Cliquer sur le bouton  Replace them dans VSCode.
```



Cela dit, attention, les snapshot tests ont deux limites :
```
•	D’une part, ils ne testent pas la validité d’un élément. Si votre test ne passe pas, cela ne veut pas dire que quelque chose ne va pas. Cela veut juste dire que le code a changé depuis la dernière fois que le snapshot a été réalisé ;
•	D’autre part, ils augmentent artificiellement la couverture de tests et ont tendance à fausser un peu cet indicateur.
```

[Documentation Jest](https://jestjs.io/docs/snapshot-testing) sur ce type de test.




