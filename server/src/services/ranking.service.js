const mongoose = require("mongoose");
const Bid = require("../models/bid.model");
const Job = require("../models/job.model");

module.exports = async (contractor, distance, job) => {
    const responseWeight = job.urgency === "Urgent" ? 0.20 : 0.10;

    let score =
        0.25 * (100 - distance) +
        0.25 * (contractor.rating * 20) +
        0.20 * contractor.completionRate +
        responseWeight * (100 - contractor.avgResponseTime) +
        0.20 * 100; // assume full trade match for now

    if (contractor.activeJobs >= 5) {
        score = score * 0.9;
    }

    return score;
};