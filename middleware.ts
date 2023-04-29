import { NextRequest, NextResponse } from 'next/server'
import { getUserPermissions, isValidToken } from './utils'

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value || ''
    const is_valid = await isValidToken(token)
    const rol = await getUserPermissions(token)

    //validar que el token sea valido en todas las rutas que revisa el middleware
    if (!is_valid) {
        const requestedPage = req.nextUrl.pathname
        const url = req.nextUrl.clone()
        url.pathname = '/auth/login'
        url.search = `p=${requestedPage}`
        return NextResponse.redirect(url)
    }

    if (req.nextUrl.pathname.startsWith('/admin')) {
        //validar que tenga los permisos para la ruta especificada
        if (rol !== 'ADMIN' && rol !== 'ASSISTANT') {
            return NextResponse.rewrite(new URL('/403', req.url))
        }
    }

    if (req.nextUrl.pathname.startsWith('/root')) {
        //validar que tenga los permisos para la ruta especificada
        if (rol !== 'ROOT') {
            return NextResponse.rewrite(new URL('/403', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        // PAGINAS:
        '/root/:path*',
        '/admin/:path*',
    ],
}
