import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import { jobApi } from '../services/job';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [jobApi.reducerPath]: jobApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(jobApi.middleware),
});
