const Bid = require("../models/bid.model");
const Contractor = require("../models/contractor.model");
const Job = require("../models/job.model");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");
const calculateScore = require("../services/ranking.service");

exports.createBid = asyncHandler(async (req, res) => {
    const { jobId, contractorId, distance, tradeMatchAccuracy } = req.body;

    const contractor = await Contractor.findById(contractorId);
    const job = await Job.findById(jobId);

    if (!contractor || !job) {
        return res.status(404).json({ success: false, message: "Job or Contractor not found" });
    }

    const score = await calculateScore(contractor, distance, job);

    const bid = await Bid.create({
        jobId,
        contractorId,
        distance,
        tradeMatchAccuracy,
        finalScore: score
    });

    res.status(201).json({ success: true, data: bid });
});

exports.getAllBids = asyncHandler(async (req, res) => {
    const bids = await Bid.find()
        .populate("contractorId")
        .populate("jobId");

    res.json({ success: true, data: bids });
});

exports.getRankedBids = asyncHandler(async (req, res) => {

    const job = await Job.findById(req.params.jobId);

    const responseWeight = job.urgency === "Urgent" ? 0.20 : 0.10;

    const bids = await Bid.aggregate([
        { $match: { jobId: new mongoose.Types.ObjectId(req.params.jobId) } },

        {
            $lookup: {
                from: "contractors",
                localField: "contractorId",
                foreignField: "_id",
                as: "contractor"
            }
        },
        { $unwind: "$contractor" },

        {
            $addFields: {
                calculatedScore: {
                    $add: [
                        { $multiply: [0.25, { $subtract: [100, "$distance"] }] },
                        { $multiply: [0.25, { $multiply: ["$contractor.rating", 20] }] },
                        { $multiply: [0.20, "$contractor.completionRate"] },
                        { $multiply: [responseWeight, { $subtract: [100, "$contractor.avgResponseTime"] }] },
                        { $multiply: [0.20, "$tradeMatchAccuracy"] }
                    ]
                }
            }
        },

        {
            $addFields: {
                penalizedScore: {
                    $cond: [
                        { $gte: ["$contractor.activeJobs", 5] },
                        { $multiply: ["$calculatedScore", 0.9] },
                        "$calculatedScore"
                    ]
                }
            }
        },

        {
            $addFields: {
                finalScore: {
                    $cond: [
                        { $ifNull: ["$adminOverrideRank", false] },
                        "$adminOverrideRank",
                        "$penalizedScore"
                    ]
                }
            }
        },

        { $sort: { finalScore: -1 } }
    ]);

    res.json({ success: true, data: bids });
});

exports.adminOverride = asyncHandler(async (req, res) => {
    const { bidId } = req.params;
    const { adminOverrideRank } = req.body;
    const bid = await Bid.findByIdAndUpdate(bidId, { adminOverrideRank }, { new: true });
    res.json({ success: true, data: bid });
});