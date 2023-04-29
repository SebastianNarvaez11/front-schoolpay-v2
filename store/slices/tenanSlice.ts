import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IStateTenant {
    isCreatingTenant: boolean
}

const initialState: IStateTenant = {
    isCreatingTenant: false,
}

export const tenantSlice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {
        set_is_creating_tenant: (state, action: PayloadAction<boolean>) => {
            state.isCreatingTenant = action.payload
        },
    },
})

export const {set_is_creating_tenant} = tenantSlice.actions
export default tenantSlice.reducer
