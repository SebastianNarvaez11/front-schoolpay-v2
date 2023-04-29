import { FC, Dispatch, SetStateAction, useState } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { ErrorText } from '@/components/ui'
import { TenantFormTwoSchema } from '@/validations'
import { Form, useFormik } from 'formik'
import { IFormTwo } from './forms.interfaces'
import { MuiFileInput } from 'mui-file-input'
import Image from 'next/image'

interface Props {
    initialData: IFormTwo
    file: File | null
    setFormTwo: Dispatch<SetStateAction<IFormTwo>>
    setFile: Dispatch<SetStateAction<File | null>>
    next: () => void
    back: () => void
}

export const FormStepTwo: FC<Props> = ({
    initialData,
    setFormTwo,
    setFile,
    next,
    back,
    file,
}) => {
    const formik = useFormik({
        initialValues: initialData,
        validationSchema: TenantFormTwoSchema,
        onSubmit: (values) => {
            setFormTwo({ subdomain: values.subdomain })
            next()
        },
    })

    const { errors, isValid, touched } = formik

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ pl: 4, pr: 4 }}>
                    <Typography
                        sx={{
                            color: '#3C3B4E',
                            fontSize: 20,
                            fontWeight: 700,
                        }}>
                        Subdominio y Logo
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 0, color: '#A49DA6', fontSize: 13 }}>
                        Es la informacion general de la empresa, esta se usara
                        para identificar a la empresa en el sistema y generar
                        reportes o documentos.
                    </Typography>
                    <Grid container mt={1} spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Subdominio"
                                variant="outlined"
                                name="subdomain"
                                value={formik.values.subdomain}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={Boolean(
                                    errors.subdomain && touched.subdomain,
                                )}
                            />
                            {errors.subdomain && touched.subdomain && (
                                <ErrorText text={errors.subdomain} />
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <MuiFileInput
                                placeholder="Selecciona un logo"
                                fullWidth
                                size="small"
                                value={file}
                                onChange={(newFile) => setFile(newFile)}
                            />
                        </Grid>
                        {file && (
                            <Image
                                alt="logo"
                                src={URL.createObjectURL(file)}
                                width={100}
                                height={100}
                                style={{ alignSelf: 'center' }}
                            />
                        )}
                    </Grid>
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
        </Box>
    )
}
