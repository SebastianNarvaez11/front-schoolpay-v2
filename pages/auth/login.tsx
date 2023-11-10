import { useState } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import {
    Typography,
    Button,
    CircularProgress,
    Box,
    TextField,
} from '@mui/material'
import { AuthLayout } from '@/components/layouts'
import styles from '@/styles/Login.module.css'
import Image from 'next/image'
import { useFormik } from 'formik'
import { LoginSchema } from '@/validations'
import { ErrorText } from '@/components/ui'
import { LoginImage } from '@/assets/svg'
import { getUserPermissions, isValidToken, showErrorMessage } from '@/utils'
import { useLoginMutation } from '@/store/apis/authApi'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

export const LoginPage: NextPage = () => {
    const router = useRouter()

    const [login, { isLoading }] = useLoginMutation()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            try {
                const { token, user } = await login(values).unwrap()

                if (token && user) {
                    Cookies.set('token', token)

                    const page_destination =
                        router.query.p?.toString() ||
                        `/${user?.rol.toLocaleLowerCase()}`

                    router.push(page_destination)
                }
            } catch (error: any) {
                showErrorMessage(error)
            }
        },
    })

    const { errors, isValid, touched } = formik

    return (
        <AuthLayout
            title="Inicio de Sesion | Schoolpay"
            description="inicia sesion en Schoolpay">
            <form onSubmit={formik.handleSubmit}>
                <Box display="flex">
                    <Box
                        className={styles.containerSVG}
                        sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <LoginImage />
                    </Box>

                    <Box className={styles.containerForm}>
                        <Box className={styles.form}>
                            <Image
                                style={{
                                    alignSelf: 'center',
                                    marginBottom: 50,
                                }}
                                src="/logo_title.png"
                                alt="logo schoolpay"
                                height={100}
                                width={300}
                            />
                            <Typography variant="h1" component="h1">
                                Inicia sesión
                            </Typography>

                            <TextField
                                sx={{ marginTop: 7, marginBottom: 1 }}
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

                            <TextField
                                sx={{ marginTop: 5, marginBottom: 1 }}
                                label="Contraseña"
                                variant="outlined"
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={Boolean(
                                    errors.password && touched.password,
                                )}
                            />
                            {errors.password && touched.password && (
                                <ErrorText text={errors.password} />
                            )}

                            <Box className={styles.containerButton}>
                                {isLoading ? (
                                    <CircularProgress />
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={!isValid}
                                        fullWidth>
                                        Ingresar
                                    </Button>
                                )}
                            </Box>

                            <Typography
                                style={{ marginTop: 50, textAlign: 'right' }}>
                                ¿No tienes una cuenta? Contactanos aqui
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </form>
        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({
    req,
    query,
}) => {
    const { token = '' } = req.cookies

    const isValid = await isValidToken(token)
    const rol = await getUserPermissions(token)

    const { p = `/${rol.toLocaleLowerCase()}` } = query

    if (isValid) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}

export default LoginPage
