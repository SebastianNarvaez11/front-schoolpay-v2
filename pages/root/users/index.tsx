import { MainLayout } from '@/components/layouts'
import { Box, Typography, Button, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/AddRounded'
import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAllUsers, deleteUser} from '@/store/thunks/userThunk'
import { Loader, Table } from '../../../components/ui'
import { IUser } from '@/interfaces/User.interface'
import { ModalCreateUser } from '@/components/modals'
import DeleteIcon from '@mui/icons-material/Delete'

export const UsersPage: FC = () => {
    const { users, isLoadingUsers } = useAppSelector((state) => state.user)
    const [showModal, setShowModal] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const columns = [
        { Header: 'Perfil', accessor: 'picture' },
        { Header: 'Usuario', accessor: 'username' },
        { Header: 'Correo', accessor: 'email' },
        {
            Header: 'Nombre',
            accessor: ({ name, lastName }: IUser) => (
                <Typography>
                    {name} {lastName}
                </Typography>
            ),
        },
        {
            Header: 'Acciones',
            accessor: (user : IUser) => (
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
                <Button size="small" onClick={() => setShowModal(true)}>
                    <AddIcon />
                    Crear usuario
                </Button>
            </Box>

            <Box>
                {isLoadingUsers ? (
                    <Loader
                        title="Cargando Usuarios"
                        subtitle="Esto puede tardar un poco ..."
                        size={50}
                    />
                ) : (
                    <Table data={users} columns={columns} />
                )}
            </Box>

            <ModalCreateUser
                isVisible={showModal}
                setIsVisible={setShowModal}
            />
        </MainLayout>
    )
}

export default UsersPage
