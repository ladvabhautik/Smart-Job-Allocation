import { Button, Column, DataTable, Dialog, Dropdown, InputNumber, ProgressSpinner, Tag } from "primereact";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    fetchBids,
    optimisticUpdate,
    overrideBid,
} from "../features/bids/bidSlice";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/axios";

export default function BidsPage() {
    const { jobId } = useParams();
    const dispatch = useDispatch();
    const { role } = useSelector((state) => state.auth);
    const { bids, loading, error } = useSelector((state) => state.bids);

    const [visible, setVisible] = useState(false);
    const [contractors, setContractors] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const [newBid, setNewBid] = useState({
        contractorId: "",
        distance: 0,
        tradeMatchAccuracy: 100,
    });

    useEffect(() => {
        dispatch(fetchBids(jobId));
        loadContractors();
    }, [dispatch, jobId]);

    const loadContractors = async () => {
        try {
            const res = await api.get("/contractors");
            setContractors(res.data.data);
        } catch {
            toast.error("Failed to load contractors");
        }
    };

    const handleCreateBid = async () => {
        if (!newBid.contractorId) {
            toast.error("Select contractor");
            return;
        }

        try {
            setSubmitting(true);

            await api.post("/bids", {
                jobId,
                contractorId: newBid.contractorId,
                distance: newBid.distance,
                tradeMatchAccuracy: newBid.tradeMatchAccuracy,
            });

            toast.success("Bid Created 🚀");
            setVisible(false);
            dispatch(fetchBids(jobId));
        } catch {
            toast.error("Failed to create bid");
        } finally {
            setSubmitting(false);
        }
    };

    const handleOverride = async (bid) => {
        const newScore = bid.finalScore + 50;

        dispatch(optimisticUpdate({ bidId: bid._id, score: newScore }));

        try {
            await dispatch(
                overrideBid({ bidId: bid._id, score: newScore })
            ).unwrap();

            toast.success("Override successful 🚀");
            dispatch(fetchBids(jobId));
        } catch {
            toast.error("Override failed ❌");
            dispatch(fetchBids(jobId));
        }
    };

    const scoreTemplate = (row) => (
        <span style={{ fontWeight: "bold", color: "#2563eb" }}>
            {row.finalScore?.toFixed(2)}
        </span>
    );

    const urgencyTemplate = (row) => {
        const contractor = row.contractorId; // ✅ correct field

        const activeJobs = contractor?.activeJobs || 0;

        return (
            <Tag
                value={activeJobs >= 5 ? "Penalty" : "Normal"}
                severity={activeJobs >= 5 ? "danger" : "success"}
            />
        );
    };

    return (
        <DashboardLayout>
            <div className="flex justify-content-between align-items-center mb-4">
                <h2>Ranked Bids</h2>
                <Button
                    label="Create Bid"
                    icon="pi pi-plus"
                    onClick={() => setVisible(true)}
                />
            </div>

            {loading && (
                <div className="flex justify-content-center mt-5">
                    <ProgressSpinner />
                </div>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && (
                <DataTable
                    value={bids}
                    paginator
                    rows={5}
                    stripedRows
                    className="shadow-2 border-round-lg"
                    scrollable
                    size="small"
                    rowsPerPageOptions={[5, 10, 20]}
                    removableSort
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} Bids`}
                >
                    <Column field="contractor.name" header="Contractor" sortable filter />
                    <Column field="contractor.rating" header="Rating" sortable filter />
                    <Column field="contractor.completionRate" header="Completion %" sortable filter />
                    <Column field="contractor.activeJobs" header="Active Jobs" sortable filter />
                    <Column header="Status" body={urgencyTemplate} />
                    <Column header="Score" body={scoreTemplate} />
                    {role === "admin" && (
                        <Column
                            header="Override"
                            body={(row) => (
                                <Button
                                    label="Boost"
                                    severity="warning"
                                    onClick={() => handleOverride(row)}
                                />
                            )}
                        />
                    )}
                </DataTable>
            )}

            {/* Create Bid Dialog */}
            <Dialog
                header="Create Bid"
                visible={visible}
                style={{ width: "30rem" }}
                onHide={() => setVisible(false)}
                modal
            >
                <div className="flex flex-column gap-3">
                    <Dropdown
                        value={newBid.contractorId}
                        options={contractors.map((c) => ({
                            label: c.name,
                            value: c._id,
                        }))}
                        onChange={(e) =>
                            setNewBid({ ...newBid, contractorId: e.value })
                        }
                        placeholder="Select Contractor"
                    />

                    <InputNumber
                        value={newBid.distance}
                        onValueChange={(e) =>
                            setNewBid({ ...newBid, distance: e.value })
                        }
                        placeholder="Distance"
                    />

                    <InputNumber
                        value={newBid.tradeMatchAccuracy}
                        onValueChange={(e) =>
                            setNewBid({
                                ...newBid,
                                tradeMatchAccuracy: e.value,
                            })
                        }
                        placeholder="Trade Match Accuracy"
                    />

                    <Button
                        label={submitting ? "Creating..." : "Submit"}
                        onClick={handleCreateBid}
                        loading={submitting}
                    />
                </div>
            </Dialog>
        </DashboardLayout>
    );
}