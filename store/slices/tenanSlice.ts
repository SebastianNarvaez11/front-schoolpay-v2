import { ITenant } from '@/interfaces/'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IStateTenant {
    isCreatingTenant: boolean
    isLoadingTenants: boolean
    tenants: ITenant[]
}

const initialState: IStateTenant = {
    isCreatingTenant: false,
    tenants: [],
    isLoadingTenants: false,
}

export const tenantSlice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {
        set_tenants: (state, action: PayloadAction<ITenant[]>) => {
            state.tenants = action.payload
        },

        set_is_creating_tenant: (state, action: PayloadAction<boolean>) => {
            state.isCreatingTenant = action.payload
        },

        set_is_loading_tenant: (state, action: PayloadAction<boolean>) => {
            state.isLoadingTenants = action.payload
        },
    },
})

export const { set_is_creating_tenant, set_tenants, set_is_loading_tenant } =
    tenantSlice.actions
export default tenantSlice.reducer
