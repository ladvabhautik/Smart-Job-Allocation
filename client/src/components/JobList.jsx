import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function JobList({ jobs }) {
    return (
        <div>
            <h3>Job List</h3>
            <DataTable value={jobs} paginator rows={5} stripedRows>
                <Column field="title" header="Title" />
                <Column field="tradeRequired" header="Trade" />
                <Column field="urgency" header="Urgency" />
            </DataTable>
        </div>
    )
}