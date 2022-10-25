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

