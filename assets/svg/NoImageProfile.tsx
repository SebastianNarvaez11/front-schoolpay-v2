import React, { FC } from 'react'

interface NoImageProfileProps {
    size?: number
}

export const NoImageProfile: FC<NoImageProfileProps> = ({ size = 40 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height={size}
        viewBox="312.809 0 401 401">
        <path fill="#E4E6E7" d="M268.073-44.735h490.423v490.423H268.073z" />
        <path
            fill="#AEB4B7"
            d="M513.81 267.142c-103.361 0-187.754 58.93-192.475 132.842h384.988c-4.733-73.918-89.157-132.842-192.512-132.842zM610.416 158.026c0 57.17-42.935 103.516-95.896 103.516s-95.895-46.346-95.895-103.516S461.559 54.51 514.52 54.51c52.968 0 95.896 46.352 95.896 103.515z"
        />
    </svg>
)
