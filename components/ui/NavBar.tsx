import { Box, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/MenuRounded'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { set_show_sidebar } from '@/store/slices/uiSlice'

export const NavBar = () => {
    const dispatch = useAppDispatch()

    const { user } = useAppSelector((state) => state.auth)
    const { showSideBar } = useAppSelector((state) => state.ui)

    return (
        <Box
            display="flex"
            sx={{
                height: 40,
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: 5,
                paddingLeft: 3,
            }}>
            <IconButton
                onClick={() => dispatch(set_show_sidebar(!showSideBar))}>
                <MenuIcon color="primary" />
            </IconButton>
            <Typography>
                {user?.name} {user?.lastName}
            </Typography>
        </Box>
    )
}
