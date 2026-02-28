import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createJobAPI, fetchJobsAPI } from "./jobAPI";

export const createJob = createAsyncThunk(
    "jobs/createJob",
    async (data, thunkAPI) => {
        try {
            const res = await createJobAPI(data);
            return res.data.data;
        } catch {
            return thunkAPI.rejectWithValue("Failed to create job");
        }
    }
);

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (_, thunkAPI) => {
    try {
        const res = await fetchJobsAPI();
        return res.data.data;
    } catch (err) {
        return thunkAPI.rejectWithValue("Failed to fetch jobs");
    }
});

const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        jobs: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.jobs.unshift(action.payload);
            });
    },
});

export default jobSlice.reducer;