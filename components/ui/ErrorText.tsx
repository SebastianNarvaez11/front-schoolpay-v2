import { FC, CSSProperties  } from 'react'
import { Typography } from '@mui/material'

interface Props {
    text: string
    style?: CSSProperties 
}

export const ErrorText: FC<Props> = ({ text, style }) => {
    return (
        <Typography style={style} color="#f50057">
            {text}
        </Typography>
    )
}
