import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IStateUI {
    showSideBar: boolean
}

const initialState: IStateUI = {
    showSideBar: true,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        set_show_sidebar: (state, action: PayloadAction<boolean>) => {
            state.showSideBar = action.payload
        },
    },
})

export const {set_show_sidebar} = uiSlice.actions
export default uiSlice.reducer
