import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance.js";

export const fetchBids = createAsyncThunk("bids/fetchBids", async (jobId) => {
    const res = await axios.get(`/bids/${jobId}`);
    return res.data;
});

export const bidSlice = createSlice({
    name: "bids",
    initialState: { bids: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBids.pending, (state) => { state.loading = true; })
            .addCase(fetchBids.fulfilled, (state, action) => {
                state.loading = false;
                state.bids = action.payload;
            })
            .addCase(fetchBids.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default bidSlice.reducer;