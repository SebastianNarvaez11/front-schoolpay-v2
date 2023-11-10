import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { host } from '@/apis/backendApi'
import Cookies from 'js-cookie'

const baseQuery = fetchBaseQuery({
    baseUrl: host,
    prepareHeaders: async (headers) => {
        headers.set('x-token', Cookies.get('token') || '')
    },
})

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        console.log('401 capturado')
    }
    return result
}
