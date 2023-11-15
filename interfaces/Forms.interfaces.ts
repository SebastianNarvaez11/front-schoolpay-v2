import { ITenantOption } from './Tenant.interface'

export interface IFormCreateUser {
    username: string
    name: string
    lastName: string
    email: string
    password1: string
    password2: string
    rol: string
    Idtenats: ITenantOption | undefined
}
