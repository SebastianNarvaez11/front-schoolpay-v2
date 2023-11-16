import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'
import {
    ICreateTenantResponse,
    IGetTenantsResponse,
    ITenantOption,
} from '@/interfaces'

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
                formData: true,
                body: tenantData,
            }),
        }),

        getTenantById: builder.mutation<ICreateTenantResponse, number>({
            query: (idu) => ({
                url: '/api/tenat/filterTenat',
                method: 'POST',
                body: { idu },
            }),
        }),

        getTenantsOptions: builder.query<ITenantOption[], void>({
            query: () => '/api/tenat',
            transformResponse: (
                baseQueryReturnValue: IGetTenantsResponse,
                meta,
                arg,
            ) => {
                const options: ITenantOption[] =
                    baseQueryReturnValue.tenats.map(
                        ({ businessName, idu }) => ({
                            label: businessName,
                            value: String(idu),
                        }),
                    )
                return options
            },
        }),
    }),
})

export const {
    useGetTenantsQuery,
    useLazyGetTenantsQuery,
    useCreateTenantMutation,
    useGetTenantByIdMutation,
    useGetTenantsOptionsQuery,
} = tenantApi
