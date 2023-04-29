import { NextPage } from 'next'
import { useState } from 'react'
import { MainLayout } from '@/components/layouts'
import { Button, Typography, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/AddRounded'
import { ModalCreateTenant } from '@/components/root'

export const TenantsPage: NextPage = () => {
    const [showModalCreateTenant, setShowModalCreateTenant] = useState(false)

    return (
        <MainLayout title="SchoolPay" description="schoolpay">
            <Box
                display="flex"
                sx={{ justifyContent: 'space-between', width: '100%' }}>
                <Typography>Tenants</Typography>
                <Button
                    size="small"
                    onClick={() => setShowModalCreateTenant(true)}>
                    <AddIcon />
                    Crear tenant
                </Button>
            </Box>

            <ModalCreateTenant
                isVisible={showModalCreateTenant}
                setIsVisible={setShowModalCreateTenant}
            />
        </MainLayout>
    )
}

export default TenantsPage
