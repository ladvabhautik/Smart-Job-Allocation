import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI } from "./authAPI";
import { jwtDecode } from "jwt-decode";

export const login = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            const res = await loginAPI(data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Login failed"
            );
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            const res = await registerAPI(data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Register failed"
            );
        }
    }
);

const getRoleFromToken = (token) => {
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        return decoded.role;
    } catch {
        return null;
    }
};

const initialToken = localStorage.getItem("token");

const initialState = {
    token: initialToken || null,
    role: getRoleFromToken(initialToken),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.token = null;
            state.role = null;
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
                state.role = getRoleFromToken(action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;