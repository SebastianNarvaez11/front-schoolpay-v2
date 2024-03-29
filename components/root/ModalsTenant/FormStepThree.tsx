import { FC, Dispatch, SetStateAction } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { ErrorText, Loader } from '@/components/ui'
import { TenantFormThreeSchema } from '@/validations'
import { Form, useFormik } from 'formik'
import { IFormOne, IFormThree, IFormTwo } from './forms.interfaces'
import { useCreateTenantMutation, useLazyGetTenantsQuery } from '@/store/apis'
import toast from 'react-hot-toast'
import { showErrorMessage } from '@/utils'
import { MuiFileInput } from 'mui-file-input'
import Image from 'next/image'
import { NoImageProfile } from '@/assets/svg'

interface Props {
    initialData: IFormThree
    setFormThree: Dispatch<SetStateAction<IFormThree>>
    formOne: IFormOne
    formTwo: IFormTwo
    back: () => void
    file: File | null
    setShowModal: (value: boolean) => void
    userImage?: File | null
    setUserImage?: Dispatch<SetStateAction<File | null>>
}

export const FormStepThree: FC<Props> = ({
    initialData,
    setFormThree,
    back,
    formOne,
    formTwo,
    file,
    setShowModal,
    userImage,
    setUserImage,
}) => {
    const [refetchTenants] = useLazyGetTenantsQuery()
    const [createTenant, { isLoading }] = useCreateTenantMutation()

    const formik = useFormik({
        initialValues: initialData,
        validationSchema: TenantFormThreeSchema,
        onSubmit: async (values) => {
            setFormThree(values)

            const data = new FormData()
            data.append('address', formOne.address)
            data.append('businessName', formOne.businessName)
            data.append('email', formOne.email)
            data.append('nit', formOne.nit)
            data.append('responsibleId', formOne.responsibleId)
            data.append('responsibleLastName', formOne.responsibleLastName)
            data.append('responsibleName', formOne.responsibleName)
            data.append('responsiblePhone', formOne.responsiblePhone)

            data.append('image', file!)
            data.append('subdomain', formTwo.subdomain)

            data.append('emailUser', values.email)
            data.append('lastName', values.lastName)
            data.append('name', values.name)
            data.append('password', values.password1)
            data.append('username', values.username)
            data.append('imageUser', userImage!)

            try {
                await createTenant(data).unwrap()
                refetchTenants()
                toast.success('Tenant creado con exito.', {
                    duration: 5000,
                })
                setShowModal(false)
            } catch (error: any) {
                showErrorMessage(error)
            }
        },
    })

    const { errors, isValid, touched } = formik

    return (
        <Box>
            {isLoading ? (
                <Loader
                    title="Estamos creando el tenant"
                    subtitle="Esto puede tardar un poco ..."
                    height={430}
                />
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ pl: 4, pr: 4 }}>
                        <Typography
                            sx={{
                                color: '#3C3B4E',
                                fontSize: 20,
                                fontWeight: 700,
                            }}>
                            Usuario Administrador
                        </Typography>
                        <Typography
                            id="modal-modal-description"
                            sx={{ mt: 0, color: '#A49DA6', fontSize: 13 }}>
                            Es la informacion general de la empresa, esta se
                            usara para identificar a la empresa en el sistema y
                            generar reportes o documentos.
                        </Typography>
                        <Grid container mt={1} spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Usuario"
                                    variant="outlined"
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={Boolean(
                                        errors.username && touched.username,
                                    )}
                                />
                                {errors.username && touched.username && (
                                    <ErrorText text={errors.username} />
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Nombres"
                                    variant="outlined"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={Boolean(errors.name && touched.name)}
                                />
                                {errors.name && touched.name && (
                                    <ErrorText text={errors.name} />
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Apellidos"
                                    variant="outlined"
                                    name="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={Boolean(
                                        errors.lastName && touched.lastName,
                                    )}
                                />
                                {errors.lastName && touched.lastName && (
                                    <ErrorText text={errors.lastName} />
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Email"
                                    variant="outlined"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={Boolean(
                                        errors.email && touched.email,
                                    )}
                                />
                                {errors.email && touched.email && (
                                    <ErrorText text={errors.email} />
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <MuiFileInput
                                    placeholder="Selecciona una foto"
                                    fullWidth
                                    size="small"
                                    value={userImage}
                                    onChange={(newFile) =>
                                        setUserImage && setUserImage(newFile)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Contraseña"
                                    variant="outlined"
                                    name="password1"
                                    type="password"
                                    value={formik.values.password1}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={Boolean(
                                        errors.password1 && touched.password1,
                                    )}
                                />
                                {errors.password1 && touched.password1 && (
                                    <ErrorText text={errors.password1} />
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Confirme la contraseña"
                                    variant="outlined"
                                    name="password2"
                                    type="password"
                                    value={formik.values.password2}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={Boolean(
                                        errors.password2 && touched.password2,
                                    )}
                                />
                                {errors.password2 && touched.password2 && (
                                    <ErrorText text={errors.password2} />
                                )}
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: 3,
                            }}>
                            {userImage ? (
                                <Image
                                    alt="logo"
                                    src={URL.createObjectURL(userImage)}
                                    width={150}
                                    height={150}
                                    style={{ alignSelf: 'center' }}
                                />
                            ) : (
                                <NoImageProfile size={150} />
                            )}
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        sx={{
                            justifyContent: 'space-between',
                            marginTop: 4,
                            marginBottom: 3,
                            width: '100%',
                        }}>
                        <Button
                            size="medium"
                            color="info"
                            variant="text"
                            onClick={back}
                            sx={{ ml: 4 }}>
                            Regresar
                        </Button>
                        <Button
                            size="medium"
                            color="success"
                            disabled={!isValid}
                            type="submit"
                            sx={{ mr: 4 }}>
                            Siguiente
                        </Button>
                    </Box>
                </form>
            )}
        </Box>
    )
}
