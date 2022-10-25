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



// export const sayHello = name => {
// if (!name) {
// return "Hello, World"
// }
// // J'ajoute ici cette ligne dans ma fonction
// if (name === "Valentin") {
// return "Bonjour Valentin"
// }
// return `Hello, ${name}`
// }