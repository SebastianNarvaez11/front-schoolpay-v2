export interface IUser {
    idu: number
    username: string
    name: string
    lastName: string
    email: string
    password: string
    state: boolean
    rol: string
    picture: string
    createdAt: Date
    updatedAt: Date
    Idtenats: number
    Tenat: ITenatUser
}

export interface ITenatUser {
    subdomain: string
    businessName: string
    picture: string
}
