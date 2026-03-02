import { Button, Column, DataTable, Dialog, Dropdown, InputText, ProgressSpinner, Tag } from "primereact";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createJob, fetchJobs } from "../features/jobs/jobSlice";
import DashboardLayout from "../layouts/DashboardLayout";

export default function JobsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { role } = useSelector((state) => state.auth);
    const { jobs, loading, error } = useSelector((state) => state.jobs);
    const [visible, setVisible] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [newJob, setNewJob] = useState({
        title: "",
        description: "",
        zipCode: "",
        tradeRequired: "",
        urgency: "Normal",
    });

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    const urgencyTemplate = (row) => {
        return (
            <Tag
                value={row.urgency}
                severity={row.urgency === "Urgent" ? "danger" : "success"}
            />
        );
    };

    const actionTemplate = (row) => {
        return (
            <Button
                size="small"
                label="View Bids"
                icon="pi pi-eye"
                severity="info"
                className="px-2 py-1"
                onClick={() => navigate(`/jobs/${row._id}`)}
            />
        );
    };

    const handleCreateJob = async () => {
        if (!newJob.title || !newJob.zipCode || !newJob.tradeRequired) {
            toast.error("Please fill required fields");
            return;
        }

        try {
            setSubmitting(true);
            await dispatch(createJob(newJob)).unwrap();
            toast.success("Job Created Successfully 🚀");
            dispatch(fetchJobs());
            setVisible(false);
            setNewJob({
                title: "",
                description: "",
                zipCode: "",
                tradeRequired: "",
                urgency: "Normal",
            });
        } catch {
            toast.error("Failed to create job");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="flex justify-content-between align-items-center mb-4">
                <h2>Jobs List</h2>
                {role === "admin" && (
                    <Button
                        label="Create Job"
                        icon="pi pi-plus"
                        onClick={() => setVisible(true)}
                    />
                )}
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex justify-content-center mt-5">
                    <ProgressSpinner />
                </div>
            )}

            {/* Error */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Table */}
            {!loading && !error && (
                <DataTable
                    value={jobs}
                    paginator
                    rows={5}
                    stripedRows
                    className="shadow-2 border-round-lg"
                    scrollable
                    size="small"
                    rowsPerPageOptions={[5, 10, 20]}
                    removableSort
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} Jobs`}
                >
                    <Column field="title" header="Title" sortable filter />
                    <Column field="zipCode" header="ZIP Code" sortable filter />
                    <Column field="tradeRequired" header="Trade" sortable filter />
                    <Column header="Urgency" body={urgencyTemplate} />
                    <Column header="Actions" body={actionTemplate} />
                </DataTable>
            )}

            {/* Create Job Dialog */}
            <Dialog
                header="Create New Job"
                visible={visible}
                style={{ width: "30rem" }}
                onHide={() => setVisible(false)}
                modal
                className="border-round-xl"
            >
                <div className="flex flex-column gap-3">
                    <InputText
                        placeholder="Title *"
                        value={newJob.title}
                        onChange={(e) =>
                            setNewJob({ ...newJob, title: e.target.value })
                        }
                    />

                    <InputText
                        placeholder="Description"
                        value={newJob.description}
                        onChange={(e) =>
                            setNewJob({ ...newJob, description: e.target.value })
                        }
                    />

                    <InputText
                        placeholder="ZIP Code *"
                        value={newJob.zipCode}
                        onChange={(e) =>
                            setNewJob({ ...newJob, zipCode: e.target.value })
                        }
                    />

                    <InputText
                        placeholder="Trade Required *"
                        value={newJob.tradeRequired}
                        onChange={(e) =>
                            setNewJob({ ...newJob, tradeRequired: e.target.value })
                        }
                    />

                    <Dropdown
                        value={newJob.urgency}
                        options={[
                            { label: "Normal", value: "Normal" },
                            { label: "Urgent", value: "Urgent" },
                        ]}
                        onChange={(e) =>
                            setNewJob({ ...newJob, urgency: e.value })
                        }
                        placeholder="Select Urgency"
                    />

                    <Button
                        label={submitting ? "Creating..." : "Submit"}
                        onClick={handleCreateJob}
                        loading={submitting}
                        className="mt-2"
                    />
                </div>
            </Dialog>
        </DashboardLayout>
    );
}