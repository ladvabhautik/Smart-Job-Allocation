import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";

export const fetchBids = createAsyncThunk(
    "bids/fetchBids",
    async (jobId, thunkAPI) => {
        try {
            const url = jobId ? `/bids/${jobId}` : `/bids`;
            const res = await api.get(url);
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch bids");
        }
    }
);

export const overrideBid = createAsyncThunk(
    "bids/overrideBid",
    async ({ bidId, score }, thunkAPI) => {
        try {
            const res = await api.patch(`/bids/override/${bidId}`, {
                adminOverrideRank: score,
            });
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Override failed");
        }
    }
);

export const optimisticUpdate = ({ bidId, score }) => ({
    type: "bids/optimisticUpdate",
    payload: { bidId, score },
});

const bidSlice = createSlice({
    name: "bids",
    initialState: {
        bids: [],
        loading: false,
        error: null,
    },
    reducers: {
        optimisticUpdate: (state, action) => {
            const { bidId, score } = action.payload;
            const bid = state.bids.find((b) => b._id === bidId);
            if (bid) {
                bid.finalScore = score;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBids.pending, (state) => {
                state.loading = true;
                state.bids = []; // 🔥 important reset
            })
            .addCase(fetchBids.fulfilled, (state, action) => {
                state.loading = false;
                state.bids = action.payload;
            })
            .addCase(fetchBids.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(overrideBid.fulfilled, (state, action) => {
                const index = state.bids.findIndex(
                    (b) => b._id === action.payload._id
                );
                if (index !== -1) {
                    state.bids[index] = action.payload;
                }
            });
    },
});

export const { optimisticUpdate: optimisticUpdateAction } = bidSlice.actions;
export default bidSlice.reducer;