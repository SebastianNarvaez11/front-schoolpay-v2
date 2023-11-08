import React, { FC, Dispatch, SetStateAction, useState } from 'react'
import { Box, Modal, SxProps, Typography } from '@mui/material'
import BusinessIcon from '@mui/icons-material/BusinessRounded'
import LanguageIcon from '@mui/icons-material/LanguageRounded'
import AdminUserIcon from '@mui/icons-material/AdminPanelSettingsRounded'
import { Loader, Stepper } from '../../ui'
import { FormStepOne } from './FormStepOne'
import { IFormOne, IFormThree, IFormTwo } from './forms.interfaces'
import { FormStepTwo } from './FormStepTwo'
import { FormStepThree } from './FormStepThree'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { MoonLoader } from 'react-spinners'
import { useGetTenant } from '@/hooks'

interface Props {
    isVisible: boolean
    setIsVisible: Dispatch<SetStateAction<boolean>>
    getTenans: () => void
}

const steps = [
    {
        title: 'Informacion del Tenant',
        icon: <BusinessIcon />,
    },
    {
        title: 'Subdominio y Logo',
        icon: <LanguageIcon />,
    },
    {
        title: 'Usuario Administrador',
        icon: <AdminUserIcon />,
    },
]

export const ModalUpdateTenant: FC<Props> = ({
    isVisible,
    setIsVisible,
    getTenans,
}) => {
    const { isCreatingTenant } = useAppSelector((state) => state.tenant)
    const dispatch = useAppDispatch()
    const [stepSelect, setStepSelect] = useState(0)

    // const { data } = useGetTenant('5')
    // console.log(data);

    const [formOne, setFormOne] = useState<IFormOne>({
        nit: '',
        businessName: '',
        address: '',
        responsibleId: '',
        responsibleName: '',
        responsibleLastName: '',
        responsiblePhone: '',
        email: '',
    })

    const [formTwo, setFormTwo] = useState<IFormTwo>({
        subdomain: '',
    })
    const [file, setFile] = useState<File | null>(null)

    const [formThree, setFormThree] = useState<IFormThree>({
        username: '',
        name: '',
        lastName: '',
        email: '',
        password1: '',
        password2: '',
    })

    const onNextStep = () => {
        setStepSelect(stepSelect + 1)
    }

    const onBackStep = () => {
        setStepSelect(stepSelect - 1)
    }

    const onCloseModal = () => {
        setFormOne({
            nit: '',
            businessName: '',
            address: '',
            responsibleId: '',
            responsibleName: '',
            responsibleLastName: '',
            responsiblePhone: '',
            email: '',
        })
        setFormTwo({
            subdomain: '',
        })
        setFormThree({
            username: '',
            name: '',
            lastName: '',
            email: '',
            password1: '',
            password2: '',
        })
        setIsVisible(false)
        setStepSelect(0)
        setFile(null)
    }

    return (
        <Modal open={isVisible} onClose={onCloseModal}>
            <Box sx={style}>
                {isCreatingTenant ? (
                    <Loader
                        title="Estamos creando el tenant"
                        subtitle="Esto puede tardar un poco ..."
                        height={430}
                    />
                ) : (
                    <>
                        <Box sx={{ pt: 4, pl: 4, pr: 4, pb: 2 }}>
                            <Stepper
                                steps={steps}
                                stepSelect={stepSelect}
                                color="#ed6c02"
                            />
                        </Box>

                        {stepSelect === 0 && (
                            <FormStepOne
                                initialData={formOne}
                                setFormOne={setFormOne}
                                back={onBackStep}
                                next={onNextStep}
                                closeModal={onCloseModal}
                            />
                        )}
                        {stepSelect === 1 && (
                            <FormStepTwo
                                initialData={formTwo}
                                setFormTwo={setFormTwo}
                                setFile={setFile}
                                back={onBackStep}
                                next={onNextStep}
                                file={file}
                            />
                        )}
                        {stepSelect === 2 && (
                            <FormStepThree
                                initialData={formThree}
                                setFormThree={setFormThree}
                                back={onBackStep}
                                formOne={formOne}
                                formTwo={formTwo}
                                file={file}
                                setShowModal={setIsVisible}
                                getTenans={getTenans}
                            />
                        )}
                    </>
                )}
            </Box>
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
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
}
