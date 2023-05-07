import * as Yup from 'yup'

const digitsOnly = (value: any) => /^\d+$/.test(value)
const lettersOnly = (value: any) => /^[A-Za-z-' 'ñ]+$/.test(value)
const validateEmail = (value: any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(value)
}

export const UserSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'El nombre de usuario debe tener minimo 3 caracteres.')
        .required('El nombre de usuario es obligatorio.'),

    name: Yup.string()
        .test('alphabets', 'El nombre solo debe contener letras.', lettersOnly)
        .min(2, 'El nombre debe tener minimo 2 caracteres.')
        .required('El nombre es obligatorio.'),

    lastName: Yup.string()
        .test(
            'alphabets',
            'El apellido solo debe contener letras.',
            lettersOnly,
        )
        .min(2, 'El apellido debe tener minimo 2 caracteres.')
        .required('El apellido es obligatorio.'),

    email: Yup.string()
        .test('Validate Emil', 'Ingrese un email valido. ', validateEmail)
        .email('Ingrese un email valido.')
        .required('El email es obligatorio.'),

    password1: Yup.string().required('La contraseña es obligatoria'),
    password2: Yup.string()
        .oneOf([Yup.ref('password1'), null!], 'Las contraseñas no coinciden.')
        .required('Repita la contraseña.'),
})
