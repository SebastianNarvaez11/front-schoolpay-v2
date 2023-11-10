import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { set_show_sidebar } from '@/store/slices/uiSlice'
import { Box, Typography, useMediaQuery } from '@mui/material'
import MoonLoader from 'react-spinners/MoonLoader'
import Head from 'next/head'
import React, { FC, ReactNode, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { SideBarUser, SideBarRoot, NavBar } from '../ui'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useLazyCheckauthQuery } from '@/store/apis/authApi'

interface Props {
    children: ReactNode
    title: string
    description: string
}

export const MainLayout: FC<Props> = ({ children, title, description }) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [checkauth, { isLoading }] = useLazyCheckauthQuery()

    const { showSideBar } = useAppSelector((state) => state.ui)
    const { user } = useAppSelector((state) => state.auth)

    const matches = useMediaQuery('(min-width:900px)')

    useEffect(() => {
        dispatch(set_show_sidebar(matches))
    }, [matches, dispatch])

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = Cookies.get('token')
                if (token && user === undefined) {
                    await checkauth().unwrap()
                }
            } catch (error) {
                Cookies.remove('token')
                router.reload()
            }
        }

        checkAuth()
    }, [router, user])

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />

                <meta name="og:title" content={title} />
                <meta name="og:description" content={description} />
            </Head>

            {isLoading || !user ? (
                <Box
                    display="flex"
                    sx={{
                        height: 'calc(100vh)',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <MoonLoader color="#5257F2" />
                </Box>
            ) : (
                <Box display="flex" sx={{ margin: '0px auto', minWidth: 375 }}>
                    <Box
                        sx={{
                            width: 150,
                            height: 'calc(100vh)',
                            display: showSideBar ? 'flex' : 'none',
                        }}>
                        {user?.rol === 'ROOT' ? (
                            <SideBarRoot />
                        ) : (
                            <SideBarUser />
                        )}
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            height: 'calc(100vh)',
                        }}>
                        <Toaster position="top-right" />
                        <NavBar />
                        <Box
                            display="flex"
                            sx={{
                                paddingTop: 2,
                                paddingLeft: { xs: 1, sm: 5 },
                                paddingRight: { xs: 1, sm: 5 },
                                flexDirection: 'column',
                            }}>
                            {children}
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    )
}
