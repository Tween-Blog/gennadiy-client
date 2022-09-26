// Imports
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import loaderSlice from './slices/loaderSlice';
import editContentSlice from './slices/editContentSlice';

// Store
const store = configureStore({
    reducer: {
      auth: authSlice, 
      loader: loaderSlice,
      editContent: editContentSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
    })
});

export default store;

// Types for using custom hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;