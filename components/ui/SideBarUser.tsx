import React from 'react'
import { Box, IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/HomeRounded'
import UserIcon from '@mui/icons-material/AdminPanelSettingsRounded'
import GroupsIcon from '@mui/icons-material/GroupsRounded'
import ControlIcon from '@mui/icons-material/QueryStatsRounded'
import PaymentsIcon from '@mui/icons-material/CurrencyExchangeRounded'
import StatisticsIcon from '@mui/icons-material/DonutSmallRounded'
import ReportIcon from '@mui/icons-material/ArticleRounded'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/store/hooks'
import Link from 'next/link'
import Image from 'next/image'

export const SideBarUser = () => {
    const { user } = useAppSelector((state) => state.auth)
    const { asPath } = useRouter()

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden',
            }}>
            <Box
                sx={{
                    display: 'flex',
                    backgroundColor: '#5257F2',
                    width: '100%',
                    height: 'calc(100vh - 20vh) ',
                    borderBottomRightRadius: 40,
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}>
                <Link href={'/admin'}>
                    <IconButton
                        aria-label="Inicio"
                        sx={{
                            color: asPath === '/admin' ? '#fff' : '#7478f5',
                            width: 50,
                            marginTop: 5,
                        }}>
                        <HomeIcon fontSize="large" />
                    </IconButton>
                </Link>

                {user?.rol === 'ADMIN' && (
                    <IconButton
                        aria-label="Usuarios"
                        sx={{
                            color:
                                asPath === '/admin/users' ? '#fff' : '#7478f5',
                            width: 50,
                            margin: 1,
                        }}>
                        <UserIcon fontSize="large" />
                    </IconButton>
                )}

                <IconButton
                    aria-label="Grupos"
                    sx={{
                        color: asPath === '/admin/groups' ? '#fff' : '#7478f5',
                        width: 50,
                        margin: 1,
                    }}>
                    <GroupsIcon fontSize="large" />
                </IconButton>
                <IconButton
                    aria-label="Control"
                    sx={{
                        color: asPath === '/admin/control' ? '#fff' : '#7478f5',
                        width: 50,
                        margin: 1,
                    }}>
                    <ControlIcon fontSize="large" />
                </IconButton>
                {user?.rol === 'ADMIN' && (
                    <IconButton
                        aria-label="Pagos"
                        sx={{
                            color:
                                asPath === '/admin/payments'
                                    ? '#fff'
                                    : '#7478f5',
                            width: 50,
                            margin: 1,
                        }}>
                        <PaymentsIcon fontSize="large" />
                    </IconButton>
                )}
                {user?.rol === 'ADMIN' && (
                    <IconButton
                        aria-label="Estadisticas"
                        sx={{
                            color:
                                asPath === '/admin/statistics'
                                    ? '#fff'
                                    : '#7478f5',
                            width: 50,
                            margin: 1,
                        }}>
                        <StatisticsIcon fontSize="large" />
                    </IconButton>
                )}
                <IconButton
                    aria-label="Reportes"
                    sx={{
                        color: asPath === '/admin/reports' ? '#fff' : '#7478f5',
                        width: 50,
                        margin: 1,
                    }}>
                    <ReportIcon fontSize="large" />
                </IconButton>
            </Box>
            {user?.Tenat.picture && (
                <Box
                    sx={{
                        marginTop: 2,
                        borderRadius: 20,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        display: 'flex',
                    }}>
                    <Image
                        alt="logo"
                        src={user?.Tenat?.picture}
                        width={100}
                        height={100}
                        style={{ alignSelf: 'center', borderRadius: 20 }}
                    />
                </Box>
            )}
        </Box>
    )
}
