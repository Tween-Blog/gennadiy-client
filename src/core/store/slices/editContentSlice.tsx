import { createSlice } from '@reduxjs/toolkit';

type EditContentState = {
    isEditNick: boolean;
    isEditDescription: boolean;
}

const initialState:EditContentState = {
    isEditNick: false,
    isEditDescription: false,
}

export const editContentSlice = createSlice({
    name: 'editContent',
    initialState,
    reducers: {
        makeEditNick: (state) => {
            state.isEditNick = !state.isEditNick;
            state.isEditDescription = false;
        },
        makeEditDescription: (state) => {
            state.isEditDescription = !state.isEditDescription;
            state.isEditNick = false;
        },
        resetEditContent: (state) => {
            state.isEditDescription = false;
            state.isEditNick = false;  
        },
    },
})

export const { makeEditNick, makeEditDescription, resetEditContent } = editContentSlice.actions;
export default editContentSlice.reducer;