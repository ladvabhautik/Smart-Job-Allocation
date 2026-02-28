const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true, index: true },
    contractorId: { type: mongoose.Schema.Types.ObjectId, ref: "Contractor", required: true, index: true },
    distance: { type: Number, required: true },
    tradeMatchAccuracy: { type: Number, min: 0, max: 100, required: true },
    finalScore: Number,
    adminOverrideRank: { type: Number, default: null }
});

bidSchema.index({ jobId: 1, finalScore: -1 });

module.exports = mongoose.model("Bid", bidSchema);