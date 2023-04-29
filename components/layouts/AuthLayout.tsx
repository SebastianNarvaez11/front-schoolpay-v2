import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { Box } from '@mui/material'

interface Props {
    title: string
    description: string
    children: ReactNode
}

export const AuthLayout: FC<Props> = ({ title, description, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />

                <meta name="og:title" content={title} />
                <meta name="og:description" content={description} />
            </Head>

            <Box sx={{ margin: '0px auto', maxWidth: 1440, minWidth: 370 }}>
                <Toaster position="top-right" />
                {children}
            </Box>
        </>
    )
}
