import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import configs from '../../configs';

const initialState = {
    loading: false,
};

const login = createAsyncThunk('user/login', async ({ username, password }) => {
    const res = await fetch(`${configs.ENDPOINT_DEV}/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ username, password }),
    });

    return res.json();
});

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(login.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.data;
        });
    },
});

export const {} = counterSlice.actions;
export { login };

export default counterSlice.reducer;
