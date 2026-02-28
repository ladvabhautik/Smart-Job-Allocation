import api from "../../services/axios";

export const createJobAPI = (data) => api.post("/jobs", data);

export const fetchJobsAPI = () => api.get("/jobs");