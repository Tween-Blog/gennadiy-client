import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'interfaces/IAuthService';

type AuthState = {
    user: IUser | {postsCount: number};
    isAuth: boolean;
}

const initialState:AuthState = {
    user: {postsCount: 0},
    isAuth: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<object>) => {
            state.user = action.payload,
            state.isAuth = true
        },
        logout: (state) => {
            state.user = {},
            state.isAuth = false
        },
        setPostsCount: (state, action: PayloadAction<number>) => {
            state.user.postsCount += action.payload
        }
    },
})

export const { login, logout, setPostsCount } = authSlice.actions;
export default authSlice.reducer;