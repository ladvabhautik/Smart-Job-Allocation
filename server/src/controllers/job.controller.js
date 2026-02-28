const Job = require("../models/job.model");
const asyncHandler = require("../utils/asyncHandler");

exports.createJob = asyncHandler(async (req, res) => {
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
});

exports.getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find();
    res.json({ success: true, data: jobs });
});