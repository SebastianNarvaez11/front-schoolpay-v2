import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'
import { IGetUsersResponse } from '@/interfaces/User.interface'

export const userApi = createApi({
    reducerPath: 'user_api',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getUsers: builder.query<IGetUsersResponse, void>({
            query: () => '/api/users',
        }),

        createUser: builder.mutation<any, FormData>({
            query: (userData) => ({
                url: '/api/users',
                method: 'POST',
                body: userData,
                formData: true,
            }),
        }),
    }),
})

export const { useGetUsersQuery, useLazyGetUsersQuery, useCreateUserMutation } =
    userApi
