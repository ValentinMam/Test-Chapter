# Adoptez la méthodologie des tests unitaires
Le test unitaire est souvent la première brique de test que vous allez mettre en place.


1.	Découvrez les tests unitaires
-	Le test unitaire


```
Le test unitaire permet de tester une partie spécifique de votre programme (comme la fonction  sayHello).
 
Un test unitaire doit être simple à écrire, à lire, et rapide à exécuter. 
Il doit aussi ne pas avoir d’effets de bord*. Pour un paramètre donné, le résultat retourné doit toujours être le même.
```

*En informatique, on dit qu’une fonction est à effet de bord si elle modifie un état autre que sa valeur de retour (le fameux  return  ), ou si le résultat qu’elle retourne change en fonction de l’état de l’application.

```
Exemple : 

// J'appelle une première fois la fonction
randomFunction(2) // retourne la valeur 15
// Je l'appelle une deuxième fois avec le même paramètre
// mais le résultat est différent. Il y a un effet de bord
randomFunction(2) // retourne la valeur 25
```
 En anglais, on appelle ça un “Side Effect” (pour effet secondaire), et je trouve ça beaucoup plus parlant.
À cause de cet effet secondaire ou de bord, une fonction peut vous retourner un résultat différent. Comme par exemple, retourner la valeur 25, au lieu de 15, dans notre exemple précédent.

```
Il existe une règle d’or quand on écrit un test unitaire : si vous ne pouvez pas réaliser votre test facilement, c’est que votre code est trop compliqué et doit être simplifié.
Il arrive régulièrement des cas où les développeurs préfèrent surcharger une fonction existante, quitte à la rendre difficilement lisible et maintenable. 
```
Exemple de mauvaise fonction :

```
const findLargestInArray = data => {
// On regarde si le tableau est composé uniquement de chiffres
if (!data.some(isNaN)) {
    // Si oui, alors on récupère le nombre le plus grand
    let largestNumber = 0;
    for (let i = 0; i < data.length; i++) {
        if (largestNumber < data[i]) {
        largestNumber = data[i]
        }
    }

// On retourne le nombre le plus grand
return largestNumber
} else {
    // Sinon, ça veut dire qu'on a un tableau de mots
    // On cherche le plus grand

let largestWord = ""
    for (let i = 0; i < data.length; i++) {
    if (largestWord.length < data[i].length) {
    largestWord = data[i]
    }
}

// On retourne le mot le plus grand
    return largestWord
    }
}
```
- On traite trop de cas de figure différents.
- On est obligé d’ajouter des commentaires pour préciser ce que l’on fait.
- C’est typiquement une fonction qui fait trop de choses, et qui va être compliquée à tester. Elle devrait donc être simplifiée. 

Exemple de code simplifié :

```
const isArrayOfNumbers = data => data.some(isNaN)

const findLargestNumberInArray = data => {
    let largestNumber = 0;
    for (let i = 0; i < data.length; i++) {
        if (largestNumber < data[i]) {
        largestNumber = data[i]
        }
    }

 return largestNumber
}

const findLargestWordInArray = data => {
    let largestWord = ""
    for (let i = 0; i < data.length; i++) {
        if (largestWord.length < data[i].length) {
        largestWord = data[i]

        }
    }

return largestWord
}

const findLargestInArray = data => {
    if (isArrayOfNumbers(data)) {
        return findLargestNumberInArray(data)
    }


return findLargestWordInArray(data)
}
```
fonctions “simples” = code coverage pertinent 

____________________________________________________

2.	Mettez en place une méthodologie pour tester vos applications
-	Décomplexifiez votre code grâce aux tests

Avant de vous lancer la tête la première dans l’écriture de votre code, et afin d'éviter de partir dans la mauvaise direction, vous devez prendre du recul sur votre base de code. Il est important que vous preniez le temps de le comprendre.  D’autant plus si le code n’a pas été écrit par vous.
Une fois que c’est fait, vous pouvez commencer par écrire les tests aux endroits les plus critiques et les plus complexes de votre application. 


```
Cette méthode a deux avantages :
•	D’une part, plus le code est complexe ou la fonctionnalité critique, plus vous allez être en mesure d’éviter que cette dernière ne casse en ajoutant des tests dessus ;
•	D’autre part, ajouter des tests sur un code complexe va souvent vous permettre de le simplifier. En effet, vous serez forcé de décomposer votre code pour pouvoir le tester plus facilement.
C’est comme une boucle vertueuse. 
```
C’est souvent une mauvaise pratique de commencer par les parties les moins critiques et les plus simples, pour aller vers les plus compliquées et les plus critiques. 
Par définition, une fonction ou un script facile à tester est un élément de votre code qui ne devrait pas avoir beaucoup de bugs. Cela ne veut pas dire que cet élément ne doit pas être testé, mais plutôt que ce n’est pas la priorité. 

-	Définissez et lancez les tests à réaliser

En fait, cela va le plus souvent dépendre de l’élément que vous souhaitez tester. Pour vous aider, on va prendre un exemple : le système de pagination.

Fichier  js/pages/common/pagination/index.js : 

```
getNumberOfPages: numberOfSensors => Math.ceil(numberOfSensors / ITEMS_PER_PAGE)
```
Cette fonction prend un paramètre :  numberOfSensors.

Cela correspond au nombre total de capteurs récupérés dans le fichier homepage-data.json  . 
```
Pour cette fonction, je peux écrire quatre tests :
•	Un cas de test où je lui passe 12 en paramètre. Ici, je ne vais pas tester le résultat de la fonction, mais simplement vérifier si la fonction me retourne bien quelque chose.
•	Un cas de test où je lui passe 0 en paramètre, soit aucun capteur. Et je teste si le nombre de pages retourné est 0.
•	Un cas de test où je lui passe 7. Le résultat retourné par la fonction devrait être de 1, car j’affiche 8 capteurs par page. Autrement dit, il n’y aura qu’une seule page.
•	Enfin, un cas où je lui passe 34, et où je teste si j’ai bien 5 pages.
```
Le nombre d’éléments par page est défini par la constante ITEMS_PER_PAGE  dans le fichier js/constants.js.
```
export const ITEMS_PER_PAGE = 8
```

 Si je change ce chiffre, pour le passer de 8 à 10, par exemple, tous mes tests vont échouer. 

```
/**
 * @function Pagination.getNumberOfPages
 */
describe('Pagination Unit Test Suites', () => {
    it('should return something', () => (
        expect(Pagination.getNumberOfPages(12)).toBeDefined()
    ))
    
    it('should return 0', () => (
        expect(Pagination.getNumberOfPages(0)).toEqual(0)
    ))
    
    it('should return 1', () => (
        expect(Pagination.getNumberOfPages(7)).toEqual(1)
    ))

    it('should return 5', () => (
        expect(Pagination.getNumberOfPages(34)).toEqual(5)
    ))
})
```
C'est normal car le nombre de pages est calculé en divisant le nombre total de capteurs par le nombre d'éléments par page. 
Si on augmente le nombre d'éléments par page, le nombre de pages va diminuer.

-	Faites attention à la spirale des tests

Il faut faire attention à ne pas tomber dans la spirale des tests et partir trop loin : le fameux “Et si”.
Par exemple : on pourrait tester si le paramètre est une chaîne de caractères. Ou alors un tableau. Ou un nombre négatif.
Dans le cadre de cette fonction, le but n’est pas de savoir si l’élément peut être autre chose qu’un nombre. On admet, par définition, que le paramètre numberOfSensors  sera un nombre. Si d’aventure, vous commenciez à avoir des erreurs dessus, alors, vous mettriez à jour ce code pour qu’il prenne les nouvelles règles en compte.
Vous pouvez donner des informations aux autres développeurs concernant le type de données attendu, en utilisant la JSDoc comme ci-dessous :

```
/**
*
* @param {number} numberOfSensors
* @returns {number}
*/
getNumberOfPages: numberOfSensors => Math.ceil(numberOfSensors / ITEMS_PER_PAGE),
```

Ici, je précise que getNumberOfPages  prend pour paramètre un nombre, et retourne un nombre. Si vous survolez cette fonction avec VSCode, ce dernier va vous donner des informations sur ces éléments.

# Réalisez vos premiers tests unitaires avec Jest


1.	Découvrez Jest

Jest est un framework de test JavaScript. Il est utilisé pour des projets TypeScript, NodeJS, React, Angular, Vue…
Jest se focalise vraiment sur la simplicité et la facilité : l’idée est de pouvoir écrire des tests facilement et rapidement, sans trop se prendre la tête sur la configuration, et de pouvoir les exécuter dans différents environnements (développement, préproduction, etc.).

[Documentation Jest](https://jestjs.io/fr/)

-	Découvrez comment Jest est configuré

```
Fichiers importants :
•	Le fichier package.json : il contient les dépendances du projet, et notamment Jest.
•	Le dossier node_modules : il contient les dépendances installées par npm.
•	babel.config.cjs : il contient la configuration de Babel.
```

-	Découvrez les commandes liées à Jest

```
Voici quelques commandes de Jest à connaître :
•	 node_modules/.bin/jest --help   – vous permet d’afficher la documentation de Jest et les options possibles.
•	 node_modules/.bin/jest --watch  – vous permet de “watcher” vos fichiers. Autrement dit, les tests se relancent sur les fichiers modifiés. Un peu comme avec Sass. 
```

____________________________________________________

2.	Prenez en main Jest
-	Prise en main de l’écriture des tests avec Jest

Pour que Jest reconnaisse vos fichiers comme des fichiers de tests, vous devez ajouter .test  au moment de la création de votre fichier. 

```
index.unit.test.js  : test unitaire
index.integration.test.js  : test d’intégration
```

N’hésitez pas à différencier vos tests avec les noms de fichiers parce que ça augmente la lisibilité du code. On sait directement où sont les tests unitaires et d’intégration.

- EXEMPLE DE TEST UNITAIRE

Fichier  js/pages/common/pagination/index.unit.test.js : 




```
import Pagination from "./index"

/**
* @function Pagination.getNumberOfPages
*/
describe('Pagination Unit Test Suites', () => {
    it('should return something', () => (
        expect(Pagination.getNumberOfPages(12)).toBeDefined()
    ))

 
    it('should return 0', () => (
        expect(Pagination.getNumberOfPages(0)).toEqual(0)
    ))

 
    it('should return 1', () => (
        expect(Pagination.getNumberOfPages(7)).toEqual(1)
    ))

 
    it('should return 5', () => (
        expect(Pagination.getNumberOfPages(34)).toEqual(5)
    ))
})

```
Explications : 
```
•   J’importe le code du fichier  js/common/pagination/index.js.
•	describe  vous permet de créer un bloc de tests  (ou “Test Suite”, en anglais). Ce n’est pas un élément obligatoire, mais cela permet de renseigner le type de test que vous réalisez.
•	it  contient  le message indiquant le résultat attendu. On écrit souvent les tests sous la forme : it(‘should ...’). Par exemple,  it(‘should return something’)   ou en français, “ça devrait retourner quelque chose”. Il est important ici de faire un message le plus synthétique et complet possible.
•	expect()  va vous permettre d'exécuter la fonction et de stocker la valeur de retour de cette dernière.
•	toBeDefined()  ou toEqual()  est le test en lui-même. C’est ce qu’on appelle le “matcher” côté test. Autrement dit, Jest va tester si le résultat de expect()  correspond au “matcher”.
```
-	Découvrez les matchers (comparateurs) de Jest

Voir dossier js/samples/unit + Lien vers [les autres matcher](https://jestjs.io/docs/expect)

-	Configurez l’exécution de vos tests

Quand on écrit des tests, il arrive parfois qu’on veuille réaliser des opérations avant chaque test et après chaque test.
Par exemple, admettons que nous souhaitions réaliser un appel API pour récupérer nos données météo avant le début de chaque test.
Nous pourrions tout à fait écrire ce bout de code dans chacun des tests. Autrement dit, dans chaque it  , nous aurions le bout de code pour récupérer nos données météo, puis le test en lui-même.
Cela dit, cela va faire pas mal de répétitions dans le code, et surtout ça va nuire un peu à la lisibilité de ce dernier. 


```
Jest nous fournit des fonctions pour gérer ces cas élégamment :
•	beforeEach  va exécuter ce bloc de code avant chaque test.
•	afterEach  va exécuter ce bloc de code après chaque test.
•	beforeAll  va exécuter ce bloc de code au début de la phase de test, et non avant chaque test.
•	afterAll  va exécuter ce bloc de code à la fin de la phase de test.
```
Exemple js/common/pagination/index.integration.test.js : 

```
let $wrapper

beforeEach(() => {
    $wrapper = document.createElement('div')
})

afterEach(() => {
    $wrapper = null
})

 
/**
* @function Pagination.render
*/

describe('Pagination Integration Test Suites', () => {
    it('should render 0 pagination list item', () => {})
    it('should render 2 pagination list item', () => {})
    it('should render 3 pagination list item', () => {})
})
```
Explications : 

```
Ici, beforeEach  me permet d'initialiser une div  au début de chaque test, et afterEach  me permet de la supprimer à la fin. Cette div  est stockée dans la variable $wrapper.
```


