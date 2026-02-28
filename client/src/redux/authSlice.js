import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI } from "../features/auth/authAPI";

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        const res = await loginAPI(data);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
});

export const register = createAsyncThunk("auth/register", async (data, thunkAPI) => {
    try {
        const res = await registerAPI(data);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Register failed");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;