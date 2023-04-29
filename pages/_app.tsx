import { store } from '@/store/store'
import { ThemeProvider } from '@mui/material/styles'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { lightTheme } from '@/themes/light'
import { AppProvider } from '@/components/AppProvider'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={lightTheme}>
                <AppProvider>
                    <Component {...pageProps} />
                </AppProvider>
            </ThemeProvider>
        </Provider>
    )
}
