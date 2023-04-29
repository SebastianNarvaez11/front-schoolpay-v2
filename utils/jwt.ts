import * as jose from 'jose'

interface IPayloadUser {
    idu: number
    username: string
    state: boolean
    rol: string
    Tenat: {}
}

export const isValidToken = async (token: string): Promise<boolean> => {
    if (!process.env.SECRETORPRIVATEKEY) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno')
    }

    try {
        await jose.jwtVerify(
            token,
            new TextEncoder().encode(process.env.SECRETORPRIVATEKEY || ''),
        )

        return true
    } catch (error) {
        return false
    }
}

export const getUserPermissions = async (token: string): Promise<string> => {
    if (!process.env.SECRETORPRIVATEKEY) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno')
    }

    try {
        const { payload } = await jose.jwtVerify(
            token,
            new TextEncoder().encode(process.env.SECRETORPRIVATEKEY || ''),
        )

        const user = payload.user as IPayloadUser

        return user.rol
    } catch (error) {
        return ''
    }
}
