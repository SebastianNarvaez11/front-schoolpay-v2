import * as Yup from 'yup'

const digitsOnly = (value: any) => /^\d+$/.test(value)
const lettersOnly = (value: any) => /^[A-Za-z-' 'ñ]+$/.test(value)
const validateEmail = (value: any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(value)
}

export const TenantFormOneSchema = Yup.object().shape({
    nit: Yup.string()
        .test(
            'Digits only',
            'Este campo solo admite valores numericos.',
            digitsOnly,
        )
        .min(5, 'El Nit debe tener minimo 5 caracteres.')
        .required('El Nit es obligatorio.'),

    businessName: Yup.string()
        .min(2, 'La razón social debe tener minimo 2 caracteres.')
        .required('La razón social es obligatoria.'),

    address: Yup.string()
        .min(2, 'La dirección debe tener minimo 2 caracteres.')
        .required('La dirección es obligatoria.'),

    email: Yup.string()
        .test('Validate Emil', 'Ingrese un email valido. ', validateEmail)
        .email('Ingrese un email valido.')
        .required('El email es obligatorio.'),

    responsibleId: Yup.string()
        .test(
            'Digits only',
            'Este campo solo admite valores numericos.',
            digitsOnly,
        )
        .min(5, 'El documento debe tener minimo 5 caracteres.')
        .required('El documento es obligatorio.'),

    responsibleName: Yup.string()
        .test('alphabets', 'El nombre solo debe contener letras.', lettersOnly)
        .min(2, 'El nombre debe tener minimo 2 caracteres.')
        .required('El nombre es obligatorio.'),

    responsibleLastName: Yup.string()
        .test(
            'alphabets',
            'El apellido solo debe contener letras.',
            lettersOnly,
        )
        .min(2, 'El apellido debe tener minimo 2 caracteres.')
        .required('El apellido es obligatorio.'),

    responsiblePhone: Yup.string()
        .test(
            'Digits only',
            'Este campo solo admite valores numericos.',
            digitsOnly,
        )
        .min(5, 'El telefono debe tener minimo 5 caracteres.')
        .max(10, 'El telefono debe tener maximo 10 caracteres.')
        .required('El telefono es obligatorio.'),
})

export const TenantFormTwoSchema = Yup.object().shape({
    subdomain: Yup.string()
        .min(2, 'El subdominio debe tener minimo 2 caracteres.')
        .required('El subdominio es obligatoriao.'),
})

export const TenantFormThreeSchema = Yup.object().shape({
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
