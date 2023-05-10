import { backendApi } from '@/apis/backendApi'
import { AppDispatch } from '../store'
import Cookies from 'js-cookie'
import {
    set_is_creating_user,
    set_is_loading_users,
    set_users,
} from '../slices/userSlice'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const token = Cookies.get('token')

export const getAllUsers = () => async (dispatch: AppDispatch) => {
    dispatch(set_is_loading_users(true))
    try {
        const { data } = await backendApi.get('/users', {
            headers: { 'x-token': token },
        })

        dispatch(set_users(data.usuarios))
        dispatch(set_is_loading_users(false))
    } catch (error) {
        dispatch(set_is_loading_users(false))
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.msg, { duration: 5000 })
        } else {
            toast.error('Error al cargar los usuarios', {
                duration: 5000,
            })
        }
    }
}

export const createUser = (user) => async (dispatch: AppDispatch) => {
    dispatch(set_is_creating_user(true))
    try {
        const { data } = await backendApi.post('/users', user, {
            headers: { 'x-token': token },
        })
        dispatch(set_is_creating_user(false))
    } catch (error) {
        dispatch(set_is_creating_user(false))
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.msg, { duration: 5000 })
        } else {
            toast.error('Error al crear el usuario', {
                duration: 5000,
            })
        }
    }
}
