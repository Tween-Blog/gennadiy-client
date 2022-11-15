import { createSlice } from '@reduxjs/toolkit';

type likeState = {
    isLike: boolean;
}

const initialState:likeState = {
    isLike: false,
}

export const editContentSlice = createSlice({
    name: 'editContent',
    initialState,
    reducers: {
        changeLike: (state) => {
            state.isLike = !state.isLike;
        },
    },
})

export const { changeLike } = editContentSlice.actions;
export default editContentSlice.reducer;