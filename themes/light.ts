import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
    palette: {
        primary: {
            light: '#5257F2',
            main: '#5257F2',
            dark: '#2b34ec',
            contrastText: '#fff',
        },
        success: {
            light: '#00C29F',
            main: '#00C29F',
            contrastText: '#fff',
        },
        error: {
            main: '#f50057',
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained',
                size: 'large',
            },
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: 60,
                    fontWeight: 600,
                    color: '#08275C',
                },
            },
        },
    },
})
