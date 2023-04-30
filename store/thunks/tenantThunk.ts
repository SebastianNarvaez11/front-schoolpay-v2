import { backendApi } from '@/apis/backendApi'
import { AppDispatch } from '../store'
import Cookies from 'js-cookie'
import { set_is_creating_tenant, set_tenants } from '../slices/tenanSlice'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const token = Cookies.get('token')

export const createTenant =
    (tenant: FormData) => async (dispatch: AppDispatch) => {
        dispatch(set_is_creating_tenant(true))

        try {
            const { data } = await backendApi.post('/tenat', tenant, {
                headers: { 'x-token': token },
            })
            dispatch(set_is_creating_tenant(false))
        } catch (error) {
            dispatch(set_is_creating_tenant(false))
            console.log('error', error)
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.msg, { duration: 5000 })
            } else {
                toast.error('Ocurrio un error al crear el tenant', {
                    duration: 5000,
                })
            }
        }
    }

export const getAllTenants = () => async (dispatch: AppDispatch) => {
    try {
        const { data } = await backendApi.get('/tenat', {
            headers: { 'x-token': token },
        })
        dispatch(set_tenants(data.tenats))
    } catch (error) {
        console.log(error)
    }
}
