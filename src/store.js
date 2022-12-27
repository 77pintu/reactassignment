import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './slice/loginSlice';
import userSlice from './slice/userSlice';

export const store=configureStore({
    reducer:{
        users:userSlice,
        login:loginSlice
    }
})



