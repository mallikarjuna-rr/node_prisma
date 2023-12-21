declare module 'user' {
    interface User {
        firstName: string
        lastName: string
        username: string
        email: string
        password: string
        age: number
        address?: Address
    }

    interface Address {
        street: string
        city: string
        state: string
        zip: string
    }
}