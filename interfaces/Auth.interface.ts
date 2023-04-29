export interface ILoginResponse {
    token: string
    user: ICurrentUser
}

export interface ICurrentUser {
    idu: string
    username: string
    name: string
    lastName: string
    email: string
    rol: IRol
    picture: string
    tenat: any
}

type IRol = 'ROOT' | 'ADMIN' | 'ASSISTANT' | 'STUDENT'
