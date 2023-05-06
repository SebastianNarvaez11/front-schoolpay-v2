import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { MoonLoader } from 'react-spinners'

interface Props {
    title: string
    subtitle?: string
    size?: number
    height?: number
}

export const Loader: FC<Props> = ({
    title,
    subtitle,
    size = 100,
    height = 250,
}) => {
    return (
        <Box
            display="flex"
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: height,
            }}>
            <MoonLoader color="#5257F2" size={size} />
            <Typography
                sx={{
                    color: '#3C3B4E',
                    fontSize: 30,
                    fontWeight: 700,
                    mt: 2,
                }}>
                {title}
            </Typography>
            <Typography
                sx={{
                    color: '#3C3B4E',
                    fontSize: 20,
                    fontWeight: 700,
                }}>
                {subtitle}
            </Typography>
        </Box>
    )
}
