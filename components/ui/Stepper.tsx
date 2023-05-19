import React, { FC, ReactElement } from 'react'
import { Box, Typography } from '@mui/material'

interface IStep {
    title: string
    icon: ReactElement
}

interface Props {
    steps: IStep[]
    stepSelect: number
}

export const Stepper: FC<Props> = ({ steps, stepSelect }) => {
    return (
        <Box>
            <Box
                display={'flex'}
                sx={{
                    alignItems: 'center',
                }}>
                {steps.map((item, index) => (
                    <>
                        {React.cloneElement(item.icon, {
                            key: item.title,
                            fontSize: 'medium',
                            sx: {
                                width: 100,
                                color:
                                    stepSelect >= index ? '#5257F2' : '#EAEAF0',
                            },
                        })}
                        {index < steps.length - 1 && (
                            <Box
                                flex={1}
                                sx={{
                                    backgroundColor:
                                        stepSelect > index
                                            ? '#5257F2'
                                            : '#EAEAF0',
                                    height: 2,
                                }}
                            />
                        )}
                    </>
                ))}
            </Box>
            <Box
                display={'flex'}
                sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                {steps.map((item, index) => (
                    <Typography
                        key={index}
                        align="center"
                        fontWeight={stepSelect === index ? 700 : 400}
                        sx={{
                            width: 100,
                            color: stepSelect >= index ? '#5257F2' : '#EAEAF0',
                        }}
                        fontSize={12}>
                        {item.title}
                    </Typography>
                ))}
            </Box>
        </Box>
    )
}
