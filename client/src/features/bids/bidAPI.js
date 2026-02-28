import api from "../../services/axios";

export const fetchBidsAPI = (jobId) => api.get(`/bids/${jobId}`);
export const overrideBidAPI = (bidId, data) =>
    api.patch(`/bids/override/${bidId}`, data);