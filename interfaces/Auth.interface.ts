export interface ILoginResponse {
    token: string
    user: ILoginUser
}
export interface IDataLoginRequest {
    username: string
    password: string
}

interface ILoginUser {
    idu: number
    username: string
    state: boolean
    rol: string
    Tenat: null
}

export interface ICurrentUser {
    idu: number
    username: string
    name: string
    lastName: string
    picture: string
    email: string
    rol: IRol
    state: boolean
    Tenat: ITenatCurrentUser
}

type IRol = 'ROOT' | 'ADMIN' | 'ASSISTANT' | 'STUDENT'

export interface ITenatCurrentUser {
    nit: string
    subdomain: string
    businessName: string
    picture: string
}

export interface ICheckAuthResponse {
    token: string
    user: ICurrentUser
}
