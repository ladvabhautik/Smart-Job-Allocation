import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance.js";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
    const res = await axios.get("/jobs");
    return res.data;
});

export const jobSlice = createSlice({
    name: "jobs",
    initialState: { jobs: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => { state.loading = true; })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default jobSlice.reducer;