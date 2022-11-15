import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import CommentsServices from '@/services/CommentsServices';
import { IPost } from 'interfaces/IPosts';

// type UpdateState = {
//     list: IPost[] | [];
//     loading: boolean,
// }

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async function () {
        const response = await CommentsServices.allComments();
        // const data = response.data.reverse();
        // return data;  
        return response.data;  
    }            
)

// const initialState = {
//     list: [],
//     loading: false,
// } 

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        list: [],
        loading: false,
    },

    reducers: {
        postComments(state, action) {
            state.list = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
    }
})

export const { postComments  } = commentsSlice.actions;
export default commentsSlice.reducer;