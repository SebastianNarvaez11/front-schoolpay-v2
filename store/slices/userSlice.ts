import { IUser } from '@/interfaces/User.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { boolean } from 'yup'

interface IStateUser {
    isLoadingUsers: boolean
    users: IUser[]
}

const initialState: IStateUser = {
    isLoadingUsers: false,
    users: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set_users: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload
        },

        set_is_loading_users: (state, action: PayloadAction<boolean>) => {
            state.isLoadingUsers = action.payload
        },
    },
})

export const { set_users, set_is_loading_users } = userSlice.actions
export default userSlice.reducer
