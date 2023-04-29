export const getRouterByRol = (rol: string) => {
    switch (rol) {
        case 'root':
            return '/admin'

        case 'student':
            return '/student'

        default:
            return '/'
    }
}
