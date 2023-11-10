import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import uiSlice from './slices/uiSlice'
import tenanSlice from './slices/tenanSlice'
import userSlice from './slices/userSlice'
import { authApi, tenantApi, userApi } from './apis'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        ui: uiSlice,
        tenant: tenanSlice,
        user: userSlice,
        [authApi.reducerPath]: authApi.reducer,
        [tenantApi.reducerPath]: tenantApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            tenantApi.middleware,
            authApi.middleware,
            userApi.middleware,
        ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
