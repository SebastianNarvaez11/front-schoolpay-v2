import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { MainLayout } from '@/components/layouts'
import { Button, Typography, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/AddRounded'
import { ModalCreateTenant } from '@/components/root'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAllTenants } from '@/store/thunks/tenantThunk'
import { Loader, Table } from '@/components/ui'
import { MoonLoader } from 'react-spinners'

export const TenantsPage: NextPage = () => {
    const dispatch = useAppDispatch()
    const { tenants, isLoadindTenants } = useAppSelector(
        (state) => state.tenant,
    )
    const [showModalCreateTenant, setShowModalCreateTenant] = useState(false)

    useEffect(() => {
        dispatch(getAllTenants())
    }, [])

    const columns = [
        { Header: 'Logo', accessor: 'picture' },
        { Header: 'Empresa', accessor: 'businessName' },
        { Header: 'Subdominio', accessor: 'subdomain' },
        { Header: 'Nit', accessor: 'nit' },
    ]

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

            <Box>
                {isLoadindTenants ? (
                    <Loader title='Cargando Tenants' subtitle='Esto puede tardar un poco ...' size={50}/>
                ) : (
                    <Table data={tenants} columns={columns} />
                )}
            </Box>

            <ModalCreateTenant
                isVisible={showModalCreateTenant}
                setIsVisible={setShowModalCreateTenant}
            />
        </MainLayout>
    )
}

export default TenantsPage
