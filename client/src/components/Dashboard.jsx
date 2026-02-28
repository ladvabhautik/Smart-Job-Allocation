import React, { useEffect } from "react";
import JobList from "./JobList.jsx";
import BidList from "./BidList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/jobSlice.js";
import Loading from "./Loading.jsx";
import Error from "./Error.jsx";
import Navbar from "./Navbar.jsx";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { jobs, loading, error } = useSelector(state => state.jobs);

    useEffect(() => { dispatch(fetchJobs()); }, [dispatch]);

    if (loading) return <Loading />;
    if (error) return <Error message={error} />;

    return (
        <div>
            <Navbar />
            <div className="p-grid p-m-3">
                <div className="p-col-8"><JobList jobs={jobs} /></div>
                <div className="p-col-4"><BidList /></div>
            </div>
        </div>
    )
}