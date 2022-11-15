import { createSlice } from '@reduxjs/toolkit';

type LoaderState = {
    isLoading: boolean;
}

const initialState:LoaderState = {
    isLoading: false
}

export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        loader: (state) => {
            state.isLoading = !state.isLoading  
        },
    },
})

export const { loader } = loaderSlice.actions;
export default loaderSlice.reducer;