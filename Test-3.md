# Adoptez la méthodologie des tests d’intégration



1.	Découvrez les tests d’intégration

Tout d’abord, vous devez savoir que les tests d’intégration arrivent souvent après les tests unitaires. En effet, ils sont un peu plus complexes à réaliser, et vous aurez souvent besoin de librairies complémentaires pour les mettre en place. 


```
•	Tests unitaires visent à tester des portions très précises de votre code, 
•	Tests d’intégration testent l’ensemble d’une fonctionnalité.
```
Une fonctionnalité, c’est une partie de votre application. C’est le formulaire qui va vous permettre d’ajouter ou d’éditer un capteur, c’est la galerie d’images pour les capteurs, c’est le système de routage, etc.

Dans ce type de test, on va donc simuler des clics de souris, compléter les champs de formulaire et récupérer des données auprès d’une API, pour voir si tout s’affiche comme il faut. 

```
Ils ne correspondent pas non plus au parcours complet d’un utilisateur. Un parcours complet serait plus proche des étapes suivantes :
•	Je vais sur telle URL ;
•	Je renseigne mon adresse e-mail et mon mot de passe, je valide ;
•	J’arrive sur la page d’accueil d’utilisateur ;
•	Je clique sur la page d’un capteur ;
•	Je vérifie si je suis bien arrivé sur la page du capteur…

Dans ce type de cas, nous serions plutôt dans un test E2E. 
Test E2E va répliquer un parcours complet : nous allons parcourir plusieurs pages et regarder si tout fonctionne correctement. 
```
____________________________________________________
2.	Mettez en place vos tests d’intégration

-	Où devez-vous ajouter vos tests d’intégration ?

Comme pour les tests unitaires, il est important que vous ajoutiez vos tests d’intégration aux endroits les plus critiques de votre application.

Quelles sont les fonctionnalités critiques de votre application ? Les fonctionnalités, qui, si elles cassent, ne vous permettent plus d’utiliser votre site correctement.

Par exemple, dans le cadre de notre projet fil rouge, cela pourrait être intéressant de tester le routeur. Bien qu’il ne soit pas l’élément le plus compliqué de notre application, c’est un élément critique et essentiel. S'il tombe, toute notre application tombe.
Nous allons devoir simuler des clics de souris, et voir si les données changent comme il faut.

- Fichier js/router/index.js : 


```
const routes = [
{
    path: "/",
    component: SignIn
},
{
    path: "/home",
    component: Home
},
{
    path: "/add-sensor",
    component: AddSensor
},
{
    path: "/facade-details",
    component: FacadeDetails
},
]

const parseLocation = () => location.hash.slice(1).toLocaleLowerCase() || '/'

const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const bindEventListener = () => {
    if (parseLocation() === '/') {
        handleSignInForm()
    }
}

export const router = async () => {
    // Find the component based on the current path
    const path = parseLocation()

    // If there is not matching route, get the "Error" Component
    const { component = ErrorPage } = findComponentByPath(path, routes) || {}

    // Render the component in the app placeholder
    document.querySelector('#root').innerHTML = await component.render()
    
    // Finally bind the app event listeners
    bindEventListener()
}
```
Le plan de test va vous aider à désigner les parties à tester impérativement. Vous pouvez donc vous en servir pour savoir où réaliser vos premiers tests..

```
Posez-vous des questions :
•	Quelle est la complexité du code et de la fonctionnalité ?
•	À quel(s) objets ou partie(s) de votre programme parle la fonctionnalité ?
Là encore, il est important de vous projeter dans cette fonctionnalité, et de bien la comprendre.
```
-	Réalisez des tests d’intégration pertinents

Une chose qui arrive souvent quand on réalise des tests d’intégration, c'est qu’on ne les teste qu’à moitié. On va tester seulement une partie de la fonctionnalité parce que cela prend trop de temps de faire le reste.
Par exemple, sur le projet fil rouge, dans le cadre de notre routeur, il faut non seulement tester le clic de la souris, mais ne pas oublier de vérifier aussi que le titre de la page a changé. En effet, si vous oubliez de tester ce changement, votre test ne sera réalisé qu’à moitié, et le code coverage ne pourra pas vous aider à voir ce que vous avez oublié. 

____________________________________________________
3.	Découvrez des tests d’intégration pour le projet

Nous allons ici nous intéresser au formulaire de connexion. 
- [Issue comprenant l’ensemble des cas de tests à réaliser]( https://s3.eu-west-1.amazonaws.com/course.oc-static.com/courses/7159306/Issue7.png) 


# Réalisez vos premiers tests d’intégration avec Jest Test DOM / Testing Library


1.	Découvrez les outils pour réaliser des tests d’intégration

Nous allons nous servir d’un deuxième framework en plus de Jest : [DOM Testing Library](https://testing-library.com/docs/dom-testing-library/intro/). 

```
•	Vous n’avez pas besoin de l’installer, vous l’avez déjà fait lors du  npm install   au début du cours. 
•	Ce nouveau framework utilise des notations complémentaires à Jest.
•	En fait, ce deuxième framework va nous aider à sélectionner des éléments sur le DOM.
```

- Fichier js/samples/integration/sample1.test.js : 

```
/**
* @jest-environment jsdom
*/

// Ici j'importe DOM Test Library
import {
    getByTestId
} from '@testing-library/dom'

 
// Je crée ma suite de test
describe('Sample 1 Integration Test Suites', () => {
    // Je crée mon test
    it('should display "Hello, Valentin"', () => {
        // Je crée un nouveau noeud
        const $wrapper = document.createElement('div')

        // Je lui injecte du HTML
        $wrapper.innerHTML = `
            <div id="root">
                <h1 data-testid="hello">Hello, Valentin h1>
            </div>
        `

        // Je teste le resultat
    expect(getByTestId($wrapper, "hello").textContent).toEqual("Hello, Valentin")
    })

})
```
Dans le code ci-dessus, je crée un nouveau nœud, je lui injecte mon HTML et je regarde si le résultat du nœud contient bien le texte “Hello, Valentin”.  

```
•	 @jest-environment jsdom : ce commentaire est à mettre dès le début du fichier. Il permet d’indiquer qu’on va utiliser un environnement DOM. Si vous l’oubliez ou l’écrivez ailleurs dans le fichier, les tests ne vont pas passer.
•	 import { getByTestId } from '@testing-library/dom' : importe la fonction getByTestId que vous allez utiliser pour récupérer un élément du DOM que vous avez créé.
•	 <h1 data-testid="hello">Hello, Valentin</h1> : ajoute un attribut data-testid .  Nous allons nous servir de ce dernier avec getByTestId .
•	 expect(getByTestId($wrapper, "hello").textContent).toEqual("Hello, Valentin ")  : récupère le nœud contenant le data-testid sur le nœud $wrapper, puis teste si le nœud comprend bien le texte “Hello, Valentin ”.
```
Vous devrez vous servir des méthodes telles que textContent  ou innerHTML  , ainsi que de nombreuses autres méthodes du JavaScript. Cela va vous permettre de continuer à pratiquer du Vanilla JavaScript. 

-	Jest n’est pas suffisant ?

En fait, Jest sait simuler un DOM grâce au commentaire  @jest-environment jsdom   . L’apport principal de testing-library est de faciliter la sélection des nœuds sur le DOM pour réaliser ces tests. Nous aurions tout à fait pu nous passer de cette librairie. 

```
Cela dit, cette solution présente de nombreux avantages :

•	Si vous travaillez sur des applications React ou Vue, vous allez passer par “React Testing Library" ou “Vue Testing Library", qui s’utilisent de la même façon que “DOM Testing Library". Autrement dit, les commandes et outils que vous apprenez ici vont vous être utiles après. 
•	Elle facilite grandement la sélection des éléments sur le DOM pour réaliser des tests. On gagne énormément de lignes de code grâce à cette librairie.
•	Enfin, cette librairie est très légère ; elle prend peu de place sur votre projet, et nécessite peu de ressources.
```

Le projet Testing Library vise à simplifier la configuration des tests quel que soit le framework, et à uniformiser les tests.
____________________________________________________
2. Prenez en main Jest Test DOM/Testing Library

- Découvrez Testing Library

Testing Library fournit une API qui facilite la sélection d’éléments sur le DOM. Elle ne teste pas les résultats (c’est le rôle de Jest). Elle se compose des Queries et des Events.

```
Les Queries sont des fonctions qui récupèrent des nœuds sur la page. Il en existe environ une vingtaine :
•	getByRole  vous permet de récupérer des nœuds via leur attribut rôle ; par exemple, le rôle   submit  pour  les boutons. Si vous souhaitez en récupérer plusieurs, vous pouvez utiliser la méthode getAllByRole  .
•	getByLabelText   est particulièrement utile pour les formulaires où on utilise les balises label  avec les balises input  . Là encore, si vous souhaitez en récupérer plusieurs, vous pouvez utiliser la méthode getAllByLabelText  .
•	getByAltText  est à utiliser pour les images qui ont des attributs alt  . 
•	getByTestId  récupère des éléments via l’attribut data-testid  . Si vous souhaitez en récupérer plusieurs, il existe la méthode getAllByTestId  .
```
Enfin, en plus des méthodes getBy…, vous pouvez utiliser les méthodes queryBy et findBy. Ces dernières ne traitent pas de la même façon les cas d’erreur ; par exemple, quand aucun nœud n’est trouvé. Comme pour Jest, je vous invite à réaliser vos tests avec la [documentation des queries](https://testing-library.com/docs/queries/about/). 

```
Les Events correspondent aux événements que vous pouvez simuler sur le DOM, par exemple un clic de souris. Ici, vous passerez le plus souvent par la méthode fireEvent  ou click  .
```
-	Découvrez Jest Test DOM

 Testing Library s’occupe de l’intégration de Jest Test DOM pour nous.  Jest Test DOM nous fournit des matchers de base de Jest, tels que :
```
1.	toBeDisabled  qui vérifie si un bouton a l’attribut disabled  ou non.
2.	toBeRequired  qui vérifie si un nœud a l’attribut required.
3.	toHaveAttribut  qui teste si un nœud a un attribut.
```
[Documentation complète de ces matchers](https://github.com/testing-library/jest-dom)

- [Issue test des routeurs](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/courses/7159306/Issue8.png)
