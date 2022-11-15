import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import PostServices from '@/services/PostServices';
import { IPost } from 'interfaces/IPosts';

// type UpdateState = {
//     list: IPost[] | [],
//     loading: boolean,
//     modeEdit: string,
// }

// export const fetchPosts = createAsyncThunk(
//     'posts/fetchPosts',
//     async function () {
//         const response = await PostServices.allPosts();
//         const data = response.data.reverse();
//         return data;  
//     }            
// )

const initialState = {
    list: [],
    loading: false,
    modeEdit: ''
} 

export const updatePostSlice = createSlice({
    name: 'updatePost',
    initialState,

    reducers: {
        userPosts(state, action) {
            state.list = action.payload;
            // state.list.unshift(action.payload);
        },
        addPost(state, action) {
            state.list.push(action.payload);
        },
        removePost(state, action) {
            state.list = state.list.filter(post => post.id !== action.payload.id);
        },
        updatePost(state, action) {
            state.list = state.list.map(post => post.id !== action.payload.id ? post : action.payload);
        },
        modeEditPost(state, action) {
            state.modeEdit = action.payload;
        },
        cancelEdit(state) {
            state.modeEdit = '';
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(fetchPosts.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(fetchPosts.fulfilled, (state, action) => {
            //     state.list = action.payload;
            //     state.loading = false;
            // })

            // .addCase(fetchPost.pending, (state) => {
            //     state.status = 'loading';
            // })

            // .addCase(fetchPost.fulfilled, (state, action) => {
            //     state.list = [action.payload];
            //     state.list = [...state.list, action.payload];
            //     state.status = 'resolved';
            // })
    }

})

export const { 
    userPosts, addPost, removePost, updatePost, modeEditPost, cancelEdit
} = updatePostSlice.actions;
export default updatePostSlice.reducer;