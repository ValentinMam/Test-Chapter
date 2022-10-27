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

