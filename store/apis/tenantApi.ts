import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'
import { ICreateTenantResponse, IGetTenantsResponse } from '@/interfaces'

export const tenantApi = createApi({
    reducerPath: 'tenant_api',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getTenants: builder.query<IGetTenantsResponse, void>({
            query: () => '/api/tenat',
        }),

        createTenant: builder.mutation<ICreateTenantResponse, FormData>({
            query: (tenantData) => ({
                url: '/api/tenat',
                method: 'POST',
                body: tenantData,
                formData: true,
            }),
        }),
    }),
})

export const {
    useGetTenantsQuery,
    useLazyGetTenantsQuery,
    useCreateTenantMutation,
} = tenantApi
