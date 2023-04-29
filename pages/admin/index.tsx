import { NextPage } from 'next'
import { MainLayout } from '@/components/layouts'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Button, Typography } from '@mui/material'
import { set_show_sidebar } from '@/store/slices/uiSlice'

export const HomeAdminPage: NextPage = () => {
    const { showSideBar } = useAppSelector((state) => state.ui)
    const dispatch = useAppDispatch()

    return (
        <MainLayout title="SchoolPay" description="schoolpay">
            <Typography>Administrador</Typography>
        </MainLayout>
    )
}

export default HomeAdminPage
