import { MainLayout } from '@/components/layouts'
import { Box, Typography, Button, IconButton, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/AddRounded'
import { FC, useState } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { deleteUser } from '@/store/thunks/userThunk'
import { Loader, Table } from '../../../components/ui'
import { IUser } from '@/interfaces/User.interface'
import { ModalCreateUser } from '@/components/modals'
import DeleteIcon from '@mui/icons-material/Delete'
import { useGetUsersQuery } from '@/store/apis'
import { MoonLoader } from 'react-spinners'

export const UsersPageAdmin: FC = () => {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useAppDispatch()

    const { data, isLoading, isFetching } = useGetUsersQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })

    const columns = [
        { Header: 'Perfil', accessor: 'picture' },
        {
            Header: 'Nombre',
            accessor: ({ name, lastName }: IUser) => (
                <Typography>
                    {name} {lastName}
                </Typography>
            ),
        },
        {
            Header: 'Tenant',
            accessor: ({ Tenat }: IUser) => (
                <Typography>{Tenat?.businessName}</Typography>
            ),
        },
        { Header: 'Rol', accessor: 'rol' },
        {
            Header: 'Acciones',
            accessor: (user: IUser) => (
                <IconButton
                    onClick={() => {
                        dispatch(deleteUser(user))
                    }}
                    sx={{
                        marginTop: 1,
                    }}>
                    <DeleteIcon fontSize="medium" />
                </IconButton>
            ),
        },
    ]

    return (
        <MainLayout title="SchoolPay" description="schoolpay">
            <Box
                display="flex"
                sx={{ justifyContent: 'space-between', width: '100%' }}>
                <Typography>Usuarios</Typography>
                <Grid container sx={{ width: 180, alignItems: 'center' }}>
                    {isFetching && (
                        <Grid item>
                            <MoonLoader size={20} color="#5257F2" />
                        </Grid>
                    )}
                    <Box flex={1} />
                    <Grid item>
                        <Button size="small" onClick={() => setShowModal(true)}>
                            <AddIcon />
                            Crear Usuario
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ marginTop: 2 }}>
                {isLoading ? (
                    <Loader
                        title="Cargando Usuarios"
                        subtitle="Esto puede tardar un poco ..."
                        size={50}
                    />
                ) : (
                    <Table data={data?.usuarios || []} columns={columns} />
                )}
            </Box>

            <ModalCreateUser
                isVisible={showModal}
                setIsVisible={setShowModal}
            />
        </MainLayout>
    )
}

export default UsersPageAdmin
