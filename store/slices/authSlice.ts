import { ICheckAuthResponse, ICurrentUser, ILoginResponse } from '@/interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../apis/authApi'

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
        logout: (state) => {
            state.isLoggedIn = false
            state.user = undefined
        },

        set_is_loading_user: (state, action: PayloadAction<boolean>) => {
            state.isLoadingUser = action.payload
        },
    },
    extraReducers: (builder) => {
        //Matcher: login
        builder.addMatcher(
            authApi.endpoints.checkauth.matchFulfilled,
            (state, action: PayloadAction<ICheckAuthResponse>) => {
                state.isLoggedIn = true
                state.user = action.payload.user
                state.isLoadingUser = false
            },
        )
    },
})

export const { set_is_loading_user, logout } = authSlice.actions
export default authSlice.reducer
