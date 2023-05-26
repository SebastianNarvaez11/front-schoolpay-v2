import { host } from '@/apis/backendApi'
import { IUser } from '@/interfaces/User.interface'
import Cookies from 'js-cookie'
import useSWR, { SWRConfiguration } from 'swr'
import useSWRImmutable from 'swr/immutable'

// se debe especificar el fetcher como provider en el _app.tsx
interface IResponse {
    usuarios: IUser[]
}

export const useUsers = (url: string, config: SWRConfiguration = {}) => {
    const token = Cookies.get('token')

    //con el inmutable solo hace el fetch cada que se monta el componente
    const { data, error } = useSWRImmutable<IResponse>(
        `${host}/api${url}`,
        (resource) =>
            fetch(resource, {
                headers: {
                    'x-token': token || '',
                },
            }).then((response) => response.json()),
        config,
    )

    return {
        users: data?.usuarios || [],
        isLoading: !error && !data,
        isError: error,
    }
}
