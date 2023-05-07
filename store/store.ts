import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import uiSlice from './slices/uiSlice'
import tenanSlice from './slices/tenanSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        ui: uiSlice,
        tenant: tenanSlice,
        user: userSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
