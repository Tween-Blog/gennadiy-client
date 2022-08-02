import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    user: object;
    isAuth: boolean;
}

const initialState:AuthState = {
    user: {},
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
        }
    },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer