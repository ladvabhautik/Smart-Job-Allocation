import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBids } from "../redux/bidSlice.js";
import Loading from "./Loading.jsx";
import Error from "./Error.jsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function BidList() {
    const dispatch = useDispatch();
    const { bids, loading, error } = useSelector(state => state.bids);

    useEffect(() => { dispatch(fetchBids()); }, [dispatch]);

    if (loading) return <Loading />;
    if (error) return <Error message={error} />;

    return (
        <div>
            <h3>Bids</h3>
            <DataTable value={bids} paginator rows={5} stripedRows>
                <Column field="contractorName" header="Contractor" />
                <Column field="score" header="Score" />
            </DataTable>
        </div>
    )
}