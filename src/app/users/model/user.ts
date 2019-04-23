export class User {
    firstname: string
    lastname: string
    description: string
    username: string    
    email: string
    password: string
    
    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
      
}

export interface UserDetails {
    userNumber: string
    firstname: string
    lastname: string
    username: string
    description: string
}