import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { MainLayout } from '@/components/layouts'
import { Button, Typography, Box, IconButton, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/AddRounded'
import { ModalCreateTenant, ModalUpdateTenant } from '@/components/root'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Loader, Table } from '@/components/ui'
import { MoonLoader } from 'react-spinners'
import { useTenants } from '@/hooks'
import DeleteIcon from '@mui/icons-material/RemoveCircleOutlineRounded'
import EditIcon from '@mui/icons-material/EditOutlined'
import { ITenant } from '@/interfaces'

export const TenantsPage: NextPage = () => {
    const dispatch = useAppDispatch()

    const { tenants, isLoading, mutate } = useTenants()

    const [showModalCreateTenant, setShowModalCreateTenant] = useState(false)
    const [showModalUpdateTenant, setShowModalUpdateTenant] = useState(false)

    const columns = [
        { Header: 'Logo', accessor: 'picture' },
        { Header: 'Empresa', accessor: 'businessName' },
        { Header: 'Subdominio', accessor: 'subdomain' },
        { Header: 'Nit', accessor: 'nit' },
        {
            Header: 'Acciones',
            accessor: (tenant: ITenant) => (
                <Grid container>
                    <Grid item>
                        <IconButton
                            onClick={() => {
                                console.log(tenant)
                            }}
                            sx={{
                                marginTop: 1,
                            }}>
                            <DeleteIcon fontSize="medium" color="error" />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton
                            onClick={() => {
                                setShowModalUpdateTenant(true)
                            }}
                            sx={{
                                marginTop: 1,
                            }}>
                            <EditIcon fontSize="medium" color="warning" />
                        </IconButton>
                    </Grid>
                </Grid>
            ),
        },
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

            <Box sx={{ marginTop: 2 }}>
                {isLoading ? (
                    <Loader
                        title="Cargando Tenants"
                        subtitle="Esto puede tardar un poco ..."
                        size={50}
                    />
                ) : (
                    <Table data={tenants} columns={columns} />
                )}
            </Box>

            <ModalCreateTenant
                isVisible={showModalCreateTenant}
                setIsVisible={setShowModalCreateTenant}
                getTenans={mutate}
            />

            {showModalUpdateTenant && (
                <ModalUpdateTenant
                    isVisible={showModalUpdateTenant}
                    setIsVisible={setShowModalUpdateTenant}
                    getTenans={mutate}
                />
            )}
        </MainLayout>
    )
}

export default TenantsPage
