import React, { FC, Dispatch, SetStateAction, useState } from 'react'
import {
    Box,
    Button,
    Grid,
    Modal,
    SxProps,
    TextField,
    Typography,
} from '@mui/material'
import { ErrorText, Loader } from '../ui'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useFormik } from 'formik'
import { UserSchema } from '@/validations'
import { MuiFileInput } from 'mui-file-input'
import { createUser } from '@/store/thunks/userThunk'
import Image from 'next/image'
import { NoImageProfile } from '@/assets/svg'

interface Props {
    isVisible: boolean
    setIsVisible: Dispatch<SetStateAction<boolean>>
}

export const ModalCreateUser: FC<Props> = ({ isVisible, setIsVisible }) => {
    const { isCreatingUser } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const [file, setFile] = useState<File | null>(null)

    const formik = useFormik({
        initialValues: {
            username: '',
            name: '',
            lastName: '',
            email: '',
            password1: '',
            password2: '',
            picture: '',
            rol: '',
        },
        validationSchema: UserSchema,
        onSubmit: (values) => {
            const data = new FormData()

            data.append('username', values.username)
            data.append('name', values.name)
            data.append('lastName', values.lastName)
            data.append('email', values.email)
            data.append('password', values.password1)
            data.append('rol', values.rol)
            data.append('picture', file!)

            dispatch(createUser(data))
        },
    })

    const { errors, isValid, touched } = formik

    return (
        <Modal open={isVisible} onClose={() => setIsVisible(false)}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    {isCreatingUser ? (
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
                                            value={formik.values.username}
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
                                            value={formik.values.name}
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
                                            value={formik.values.lastName}
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
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Rol"
                                            variant="outlined"
                                            name="rol"
                                            value={formik.values.rol}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={Boolean(
                                                errors.rol && touched.rol,
                                            )}
                                        />
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
                                            value={formik.values.password1}
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
                                            value={formik.values.password2}
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
