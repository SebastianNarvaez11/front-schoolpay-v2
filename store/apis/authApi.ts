import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'
import { ICheckAuthResponse, IDataLoginRequest, ILoginResponse } from '@/interfaces'

export const authApi = createApi({
    reducerPath: 'auth_api',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, IDataLoginRequest>({
            query: (credentials) => ({
                url: '/api/login',
                method: 'POST',
                body: credentials,
                formData: true,
            }),
        }),

        checkauth: builder.query<ICheckAuthResponse, void>({
            query: () => '/api/login/checkauth',
        }),
    }),
})

export const { useLoginMutation, useLazyCheckauthQuery } = authApi
