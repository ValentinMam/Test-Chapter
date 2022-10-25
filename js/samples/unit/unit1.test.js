import { sayHello } from './unit1'

describe('Hello test', () => {
    it('should return "Hello, World"', () => {
        expect(sayHello()).toBe("Hello, World")
    })
    
    it('should be "Hello, Valentin"', () => {
        expect(sayHello("Valentin")).toBe("Hello, Valentin")
    })
})

