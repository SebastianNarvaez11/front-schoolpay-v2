import { backendApi } from '@/apis/backendApi'
import { AppDispatch } from '../store'
import Cookies from 'js-cookie'
import { set_is_loading_users, set_users } from '../slices/userSlice'

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
        console.log(error)
    }
}

export const createUser = (user) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await backendApi.post('/users', user, {
            headers: { 'x-token': token },
        })

        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
