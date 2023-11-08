import { FC, Dispatch, SetStateAction } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { ErrorText } from '@/components/ui'
import { TenantFormOneSchema } from '@/validations'
import { Form, useFormik } from 'formik'
import { IFormOne } from './forms.interfaces'

interface Props {
    initialData: IFormOne
    setFormOne: Dispatch<SetStateAction<IFormOne>>
    next: () => void
    back: () => void
    closeModal: () => void
    isUpdate?: boolean
}

export const FormStepOne: FC<Props> = ({
    initialData,
    setFormOne,
    next,
    back,
    closeModal,
    isUpdate = false
}) => {
    const formik = useFormik({
        initialValues: initialData,
        validationSchema: TenantFormOneSchema,
        onSubmit: (values) => {
            setFormOne(values)
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
                        Información del tenant
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 0, color: '#A49DA6', fontSize: 13 }}>
                        Es la informacion general de la empresa, esta se usara
                        para identificar a la empresa en el sistema y generar
                        reportes o documentos.
                    </Typography>
                    <Grid container mt={1} spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Nit"
                                variant="outlined"
                                name="nit"
                                value={formik.values.nit}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={Boolean(errors.nit && touched.nit)}
                            />
                            {errors.nit && touched.nit && (
                                <ErrorText text={errors.nit} />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Razón Social"
                                variant="outlined"
                                name="businessName"
                                value={formik.values.businessName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={Boolean(
                                    errors.businessName && touched.businessName,
                                )}
                            />
                            {errors.businessName && touched.businessName && (
                                <ErrorText text={errors.businessName} />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Dirección"
                                variant="outlined"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={Boolean(
                                    errors.address && touched.address,
                                )}
                            />
                            {errors.address && touched.address && (
                                <ErrorText text={errors.address} />
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
                                error={Boolean(errors.email && touched.email)}
                            />
                            {errors.email && touched.email && (
                                <ErrorText text={errors.email} />
                            )}
                        </Grid>
                    </Grid>
                    <Typography
                        id="modal-modal-description"
                        mt={4}
                        sx={{ color: '#A49DA6', fontSize: 13 }}>
                        Información del Representante Legal de la empresa:
                    </Typography>
                    <Grid container spacing={2} sx={{ marginTop: 0 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="No. Documento"
                                variant="outlined"
                                name="responsibleId"
                                value={formik.values.responsibleId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={Boolean(
                                    errors.responsibleId &&
                                        touched.responsibleId,
                                )}
                            />
                            {errors.responsibleId && touched.responsibleId && (
                                <ErrorText text={errors.responsibleId} />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Nombres"
                                variant="outlined"
                                name="responsibleName"
                                value={formik.values.responsibleName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={Boolean(
                                    errors.responsibleName &&
                                        touched.responsibleName,
                                )}
                            />
                            {errors.responsibleName &&
                                touched.responsibleName && (
                                    <ErrorText text={errors.responsibleName} />
                                )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Apellidos"
                                variant="outlined"
                                name="responsibleLastName"
                                value={formik.values.responsibleLastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={Boolean(
                                    errors.responsibleLastName &&
                                        touched.responsibleLastName,
                                )}
                            />
                            {errors.responsibleLastName &&
                                touched.responsibleLastName && (
                                    <ErrorText
                                        text={errors.responsibleLastName}
                                    />
                                )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Telefono"
                                variant="outlined"
                                name="responsiblePhone"
                                value={formik.values.responsiblePhone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={Boolean(
                                    errors.responsiblePhone &&
                                        touched.responsiblePhone,
                                )}
                            />
                            {errors.responsiblePhone &&
                                touched.responsiblePhone && (
                                    <ErrorText text={errors.responsiblePhone} />
                                )}
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    display="flex"
                    sx={{
                        marginTop: 4,
                        marginBottom: 3,
                        justifyContent: 'space-between',
                        width: '100%',
                    }}>
                    <Button
                        size="medium"
                        color="info"
                        variant="text"
                        onClick={closeModal}
                        sx={{ ml: 4 }}>
                        Cancelar
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
