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