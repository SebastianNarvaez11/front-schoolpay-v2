import React from 'react'
import { Box, IconButton } from '@mui/material'
import BusinessIcon from '@mui/icons-material/BusinessRounded'
import HomeIcon from '@mui/icons-material/HomeRounded'
import UserIcon from '@mui/icons-material/AdminPanelSettingsRounded'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/store/hooks'
import Link from 'next/link'

export const SideBarRoot = () => {
    const { asPath } = useRouter()

    return (
        <Box
            sx={{
                display: 'flex',
                backgroundColor: '#5257F2',
                width: '100%',
                height: 'calc(100vh - 20vh) ',
                borderBottomRightRadius: 40,
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Link href={'/root'}>
                <IconButton
                    aria-label="Inicio"
                    sx={{
                        color: asPath === '/root' ? '#fff' : '#7478f5',
                        width: 50,
                        marginTop: 5,
                    }}>
                    <HomeIcon fontSize="large" />
                </IconButton>
            </Link>

            <Link href={'/root/tenants'}>
                <IconButton
                    aria-label="Empresas"
                    sx={{
                        color: asPath === '/root/tenants' ? '#fff' : '#7478f5',
                        width: 50,
                        marginTop: 1,
                    }}>
                    <BusinessIcon fontSize="large" />
                </IconButton>
            </Link>

            <Link href={'/root/users'}>
                <IconButton
                    aria-label="Usuarios"
                    sx={{
                        color: asPath === '/root/users' ? '#fff' : '#7478f5',
                        width: 50,
                        marginTop: 1,
                    }}>
                    <UserIcon fontSize="large" />
                </IconButton>
            </Link>
        </Box>
    )
}
