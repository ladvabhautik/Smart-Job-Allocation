import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../layouts/DashboardLayout";
import { fetchJobs } from "../features/jobs/jobSlice";
import { fetchBids } from "../features/bids/bidSlice";
import Chart from "react-apexcharts";
import { Briefcase, AlertTriangle, BarChart3, Users } from "lucide-react";
import "../styles/dashboard.css";

export default function Dashboard() {
    const dispatch = useDispatch();

    const { jobs, loading: jobsLoading } = useSelector((state) => state.jobs);
    const { bids, loading: bidsLoading } = useSelector((state) => state.bids);

    const [dateFilter, setDateFilter] = useState("all");

    // Load on refresh
    useEffect(() => {
        dispatch(fetchJobs());
        dispatch(fetchBids());
    }, [dispatch]);

    // 🔥 Live Auto Refresh
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchJobs());
            dispatch(fetchBids());
        }, 20000);

        return () => clearInterval(interval);
    }, [dispatch]);

    // Date filter logic
    const filteredBids = bids?.filter((bid) => {
        if (dateFilter === "all") return true;

        const bidDate = new Date(bid.createdAt);
        const now = new Date();
        const diffDays = (now - bidDate) / (1000 * 60 * 60 * 24);

        if (dateFilter === "7") return diffDays <= 7;
        if (dateFilter === "30") return diffDays <= 30;

        return true;
    }) || [];

    const totalJobs = jobs?.length || 0;
    const urgentJobs = jobs?.filter(j => j.urgency === "Urgent").length || 0;
    const totalBids = filteredBids.length;

    const avgScore =
        totalBids > 0
            ? (
                filteredBids.reduce((acc, b) => acc + (b.finalScore || 0), 0) /
                totalBids
            ).toFixed(2)
            : 0;

    // Top 5 Contractors
    const contractorStats = {};
    filteredBids.forEach((bid) => {
        const name = bid.contractor?.name || "Unknown";

        if (!contractorStats[name]) {
            contractorStats[name] = { totalScore: 0, count: 0 };
        }

        contractorStats[name].totalScore += bid.finalScore || 0;
        contractorStats[name].count += 1;
    });

    const topContractors = Object.entries(contractorStats)
        .map(([name, data]) => ({
            name,
            avg: data.totalScore / data.count,
        }))
        .sort((a, b) => b.avg - a.avg)
        .slice(0, 5);

    const contractorChartOptions = {
        chart: { toolbar: { show: false } },
        xaxis: {
            categories: topContractors.map((c) => c.name),
        },
        colors: ["#22c55e"],
        dataLabels: { enabled: false },
    };

    const contractorChartSeries = [
        {
            name: "Avg Score",
            data: topContractors.map((c) => c.avg.toFixed(2)),
        },
    ];

    const donutOptions = {
        labels: ["Normal Jobs", "Urgent Jobs"],
        legend: { position: "bottom" },
        colors: ["#3b82f6", "#ef4444"],
        dataLabels: { enabled: false },
    };

    const donutSeries = [totalJobs - urgentJobs, urgentJobs];

    const barOptions = {
        chart: { toolbar: { show: false } },
        xaxis: { categories: ["Total Jobs", "Total Bids"] },
        colors: ["#6366f1"],
        dataLabels: { enabled: false },
    };

    const barSeries = [
        {
            name: "Count",
            data: [totalJobs, totalBids],
        },
    ];

    const isLoading = jobsLoading || bidsLoading;

    return (
        <DashboardLayout>
            <div className="dashboard-wrapper">

                <div className="dashboard-header">
                    <h1>Dashboard Overview</h1>
                    <p>Track jobs, bids and performance insights</p>

                    <div className="filter-container">
                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        >
                            <option value="all">All Time</option>
                            <option value="7">Last 7 Days</option>
                            <option value="30">Last 30 Days</option>
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="dashboard-loading">Loading dashboard...</div>
                ) : (
                    <>
                        <div className="kpi-grid">
                            <div className="kpi-card blue">
                                <div className="kpi-icon">
                                    <Briefcase size={22} />
                                </div>
                                <div>
                                    <h2>{totalJobs}</h2>
                                    <span>Total Jobs</span>
                                </div>
                            </div>

                            <div className="kpi-card red">
                                <div className="kpi-icon">
                                    <AlertTriangle size={22} />
                                </div>
                                <div>
                                    <h2>{urgentJobs}</h2>
                                    <span>Urgent Jobs</span>
                                </div>
                            </div>

                            <div className="kpi-card purple">
                                <div className="kpi-icon">
                                    <BarChart3 size={22} />
                                </div>
                                <div>
                                    <h2>{totalBids}</h2>
                                    <span>Total Bids</span>
                                </div>
                            </div>

                            <div className="kpi-card green">
                                <div className="kpi-icon">
                                    <Users size={22} />
                                </div>
                                <div>
                                    <h2>{avgScore}</h2>
                                    <span>Average Score</span>
                                </div>
                            </div>
                        </div>

                        <div className="charts-grid">
                            <div className="chart-card">
                                <div className="chart-title">Jobs Distribution</div>
                                <Chart
                                    options={donutOptions}
                                    series={donutSeries}
                                    type="donut"
                                    height={320}
                                />
                            </div>

                            <div className="chart-card">
                                <div className="chart-title">Jobs vs Bids</div>
                                <Chart
                                    options={barOptions}
                                    series={barSeries}
                                    type="bar"
                                    height={320}
                                />
                            </div>

                            <div className="chart-card full-width">
                                <div className="chart-title">Top 5 Contractors</div>
                                <Chart
                                    options={contractorChartOptions}
                                    series={contractorChartSeries}
                                    type="bar"
                                    height={320}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}