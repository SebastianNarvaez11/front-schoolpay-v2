import { backendApi } from '@/apis/backendApi'
import { AppDispatch } from '../store'
import Cookies from 'js-cookie'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ILoginResponse } from '@/interfaces'
import { set_is_loading_user } from '../slices/authSlice'
import { NextRouter } from 'next/router'

// export const loginUser = async (username: string, password: string) => {
//     try {
//         const { data } = await backendApi.post<ILoginResponse>('/login', {
//             username,
//             password,
//         })
//         Cookies.set('token', data.token)
//         return {
//             isSuccess: true,
//             user: data.user,
//         }
//     } catch (error) {
//         console.log('error', error)
//         if (axios.isAxiosError(error)) {
//             toast.error(error.response?.data.msg)
//         } else {
//             toast.error('Error en el proceso de autenticacion')
//         }
//         return {
//             isSuccess: false,
//         }
//     }
// }

// export const getCurrentUser =
//     (token: string, router: NextRouter) => async (dispatch: AppDispatch) => {
//         try {
//             const { data } = await backendApi.get<ILoginResponse>(
//                 '/login/checkauth',
//                 {
//                     headers: { 'x-token': token },
//                 },
//             )

//             dispatch(login(data))
//         } catch (error) {
//             console.log(error)
//             dispatch(set_is_loading_user(false))
//             Cookies.remove('token')
//             router.reload()
//         }
//     }
