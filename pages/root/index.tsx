import { NextPage } from 'next'
import { MainLayout } from '@/components/layouts'
import { Typography } from '@mui/material'

export const HomeRootPage: NextPage = () => {

    return (
        <MainLayout title="SchoolPay" description="schoolpay">
            <Typography>Home</Typography>
        </MainLayout>
    )
}

export default HomeRootPage
