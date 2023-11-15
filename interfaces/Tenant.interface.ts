export interface IGetTenantsResponse {
    tenats: ITenant[]
}

export interface ITenant {
    idu: number
    nit: string
    businessName: string
    address: string
    responsibleId: string
    responsibleName: string
    responsibleLastName: string
    responsiblePhone: string
    subdomain: string
    email: string
    schema: string
    state: boolean
    picture: string
    createdAt: Date
    updatedAt: Date
}

export interface ICreateTenantResponse {
    tenatc: ITenant
    userC: UserC
}

interface UserC {
    state: boolean
    picture: string
    idu: number
    lastName: string
    name: string
    password: string
    username: string
    email: string
    rol: string
    Idtenats: number
    updatedAt: Date
    createdAt: Date
}

export interface ITenantOption {
    label: string
    value: string
}
