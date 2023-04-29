import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Ingresa mas de 2 caracteres')
        .max(40, 'Usuario demasiado largo')
        .required('El usuario es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
})
