import React, { FC, Dispatch, SetStateAction, useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    SxProps,
    TextField,
    Typography,
} from '@mui/material'
import { ErrorText, Loader } from '../ui'
import { useFormik } from 'formik'
import { AdminCreateUserSchema, RootCreateUserSchema } from '@/validations'
import { MuiFileInput } from 'mui-file-input'
import Image from 'next/image'
import { NoImageProfile } from '@/assets/svg'
import {
    useCreateUserMutation,
    useGetTenantsOptionsQuery,
    useGetTenantsQuery,
    useLazyGetUsersQuery,
} from '@/store/apis'
import toast from 'react-hot-toast'
import { showErrorMessage } from '@/utils'
import SelectSearch from 'react-select'
import { IFormCreateUser, ITenant } from '@/interfaces'
import { useAppSelector } from '@/store/hooks'

interface Props {
    isVisible: boolean
    setIsVisible: Dispatch<SetStateAction<boolean>>
}

export const ModalCreateUser: FC<Props> = ({ isVisible, setIsVisible }) => {
    const { user } = useAppSelector((state) => state.auth)
    const [createUser, { isLoading }] = useCreateUserMutation()
    const [refetchUsers] = useLazyGetUsersQuery()
    const { data: tenantsOptions, isLoading: isLoadingTenant } =
        useGetTenantsOptionsQuery()

    const [file, setFile] = useState<File | null>(null)

    const formik = useFormik({
        initialValues: {
            username: '',
            name: '',
            lastName: '',
            email: '',
            password1: '',
            password2: '',
            rol: '',
            Idtenats: undefined,
        } as IFormCreateUser,
        validationSchema:
            user?.rol === 'ROOT' ? RootCreateUserSchema : AdminCreateUserSchema,
        onSubmit: async (values) => {
            const data = new FormData()

            data.append('username', values.username)
            data.append('name', values.name)
            data.append('lastName', values.lastName)
            data.append('email', values.email)
            data.append('password', values.password1)
            data.append('rol', values.rol)
            data.append('image', file!)
            if (values.Idtenats) {
                data.append('Idtenats', values?.Idtenats?.value!)
            }

            try {
                await createUser(data).unwrap()
                refetchUsers()
                toast.success('Usuario creado con exito.', {
                    duration: 5000,
                })
                setIsVisible(false)
            } catch (error) {
                showErrorMessage(error)
            }
        },
    })

    const { errors, isValid, touched, values } = formik

    return (
        <Modal open={isVisible} onClose={() => setIsVisible(false)}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    {isLoading ? (
                        <Loader
                            title="Estamos creando el usuario"
                            subtitle="Esto puede tardar un poco ..."
                            height={630}
                        />
                    ) : (
                        <>
                            <Box sx={{ pl: 4, pr: 4, mt: 5 }}>
                                <Typography
                                    sx={{
                                        color: '#3C3B4E',
                                        fontSize: 20,
                                        fontWeight: 700,
                                    }}>
                                    Crear Usuario
                                </Typography>
                                <Typography
                                    id="modal-modal-description"
                                    sx={{
                                        mt: 0,
                                        color: '#A49DA6',
                                        fontSize: 13,
                                    }}>
                                    Es la informacion general de la empresa,
                                    esta se usara para identificar a la empresa
                                    en el sistema y generar reportes o
                                    documentos.
                                </Typography>

                                <Grid container mt={1} spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Usuario"
                                            variant="outlined"
                                            name="username"
                                            value={values.username}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={Boolean(
                                                errors.username &&
                                                    touched.username,
                                            )}
                                        />
                                        {errors.username &&
                                            touched.username && (
                                                <ErrorText
                                                    text={errors.username}
                                                />
                                            )}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Nombres"
                                            variant="outlined"
                                            name="name"
                                            value={values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={Boolean(
                                                errors.name && touched.name,
                                            )}
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
                                            value={values.lastName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={Boolean(
                                                errors.lastName &&
                                                    touched.lastName,
                                            )}
                                        />
                                        {errors.lastName &&
                                            touched.lastName && (
                                                <ErrorText
                                                    text={errors.lastName}
                                                />
                                            )}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="demo-simple-select-label">
                                                Rol
                                            </InputLabel>
                                            <Select
                                                size="small"
                                                name="rol"
                                                value={values.rol}
                                                label="Rol"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={Boolean(
                                                    errors.rol && touched.rol,
                                                )}>
                                                {user?.rol === 'ROOT' && (
                                                    <MenuItem value={'ROOT'}>
                                                        Root
                                                    </MenuItem>
                                                )}
                                                <MenuItem value={'ADMIN'}>
                                                    Administrador
                                                </MenuItem>
                                                <MenuItem value={'ASSISTANT'}>
                                                    Asistente
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                        {errors.rol && touched.rol && (
                                            <ErrorText text={errors.rol} />
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Email"
                                            variant="outlined"
                                            name="email"
                                            value={values.email}
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
                                    {values.rol !== 'ROOT' &&
                                        user?.rol === 'ROOT' && (
                                            <Grid item xs={12} sm={6}>
                                                <SelectSearch
                                                    placeholder="Tenant"
                                                    value={values.Idtenats}
                                                    name="Idtenats"
                                                    onChange={(item) =>
                                                        formik.setFieldValue(
                                                            'Idtenats',
                                                            item,
                                                        )
                                                    }
                                                    onBlur={(v) =>
                                                        formik.setFieldTouched(
                                                            'Idtenats',
                                                        )
                                                    }
                                                    getOptionLabel={(v) =>
                                                        v?.label || ''
                                                    }
                                                    getOptionValue={(v) =>
                                                        v?.value || ''
                                                    }
                                                    options={
                                                        tenantsOptions || []
                                                    }
                                                    isLoading={isLoadingTenant}
                                                />
                                                {errors.Idtenats &&
                                                    touched.Idtenats && (
                                                        <ErrorText
                                                            text={
                                                                'El tenant es obligatorio'
                                                            }
                                                        />
                                                    )}
                                            </Grid>
                                        )}
                                    <Grid item xs={12}>
                                        <MuiFileInput
                                            placeholder="Selecciona una foto"
                                            fullWidth
                                            size="small"
                                            value={file}
                                            onChange={(newFile) =>
                                                setFile(newFile)
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
                                            value={values.password1}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={Boolean(
                                                errors.password1 &&
                                                    touched.password1,
                                            )}
                                        />
                                        {errors.password1 &&
                                            touched.password1 && (
                                                <ErrorText
                                                    text={errors.password1}
                                                />
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
                                            value={values.password2}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={Boolean(
                                                errors.password2 &&
                                                    touched.password2,
                                            )}
                                        />
                                        {errors.password2 &&
                                            touched.password2 && (
                                                <ErrorText
                                                    text={errors.password2}
                                                />
                                            )}
                                    </Grid>
                                </Grid>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: 3,
                                    }}>
                                    {file ? (
                                        <Image
                                            alt="logo"
                                            src={URL.createObjectURL(file)}
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
                                    position: 'absolute',
                                    bottom: 20,
                                    width: '100%',
                                }}>
                                <Button
                                    size="medium"
                                    color="info"
                                    variant="text"
                                    onClick={() => setIsVisible(false)}
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
                        </>
                    )}
                </Box>
            </form>
        </Modal>
    )
}

const style: SxProps = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    minWidth: 300,
    maxWidth: 600,
    minHeight: 630,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
}
