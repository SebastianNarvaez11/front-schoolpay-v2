import axios from 'axios'
import toast from 'react-hot-toast'

export const showErrorMessage = (error: any) => {
    console.log(error)

    if (axios.isAxiosError(error)) {
        return toast.error(error.response?.data.msg, { duration: 5000 })
    }

    if (error.data.errors) {
        return error.data.errors.map((e: any) =>
            toast.error(e.msg + ': ' + e.value, { duration: 5000 }),
        )
    }

    if (error.data.msg) {
        return toast.error(error.data.msg, { duration: 5000 })
    }
}
