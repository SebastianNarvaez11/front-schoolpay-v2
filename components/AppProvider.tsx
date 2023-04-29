import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export const AppProvider: FC<Props> = ({ children }) => {
    return <>{children}</>
}
