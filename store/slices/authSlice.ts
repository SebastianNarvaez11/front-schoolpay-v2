import { ICurrentUser, ILoginResponse } from '@/interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IStateAuth {
    isLoggedIn: boolean
    user?: ICurrentUser
    isLoadingUser: boolean
}

const initialState: IStateAuth = {
    isLoggedIn: false,
    user: undefined,
    isLoadingUser: true,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<ILoginResponse>) => {
            state.isLoggedIn = true
            state.user = action.payload.user
            state.isLoadingUser = false
        },

        set_is_loading_user: (state, action: PayloadAction<boolean>) => {
            state.isLoadingUser = action.payload
        },
    },
})

export const { login, set_is_loading_user } = authSlice.actions
export default authSlice.reducer
