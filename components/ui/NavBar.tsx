import { Box, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/MenuRounded'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { set_show_sidebar } from '@/store/slices/uiSlice'
import LogoutIcon from '@mui/icons-material/LogoutRounded'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { logout } from '@/store/slices/authSlice'
import Image from 'next/image'
import { NoImageProfile } from '@/assets/svg'

export const NavBar = () => {
    const router = useRouter()

    const dispatch = useAppDispatch()

    const { user } = useAppSelector((state) => state.auth)
    const { showSideBar } = useAppSelector((state) => state.ui)

    const handleLogout = () => {
        dispatch(logout())
        Cookies.remove('token')
        router.push('/auth/login')
    }

    return (
        <Box
            display="flex"
            sx={{
                height: 50,
                alignItems: 'center',
                paddingRight: 5,
                paddingLeft: 3,
            }}>
            <IconButton
                onClick={() => dispatch(set_show_sidebar(!showSideBar))}>
                <MenuIcon color="primary" />
            </IconButton>

            <Box sx={{ flex: 1 }} />

            <Typography>
                {user?.name} {user?.lastName}
            </Typography>

            {user?.picture ? (
                <Image
                    alt="logo"
                    src={user.picture}
                    width={35}
                    height={35}
                    style={{
                        justifySelf: 'center',
                        borderRadius: 20,
                        marginLeft: 10,
                        marginRight: 20,
                    }}
                />
            ) : (
                <Box
                    style={{
                        borderRadius: 20,
                        marginLeft: 10,
                        marginRight: 20,
                    }}>
                    <NoImageProfile size={35} />
                </Box>
            )}

            <IconButton onClick={() => handleLogout()}>
                <LogoutIcon color="primary" />
            </IconButton>
        </Box>
    )
}
