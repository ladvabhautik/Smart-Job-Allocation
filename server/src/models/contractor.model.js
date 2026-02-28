const mongoose = require("mongoose");

const contractorSchema = new mongoose.Schema({
    name: String,
    email: String,
    trade: String,
    rating: { type: Number, min: 0, max: 5, default: 0 },
    completionRate: { type: Number, min: 0, max: 100, default: 0 },
    avgResponseTime: { type: Number, min: 0, default: 0 },
    activeJobs: { type: Number, default: 0 },
    zipCode: { type: String, index: true }
});

contractorSchema.index({ rating: -1 });
contractorSchema.index({ activeJobs: 1 });

module.exports = mongoose.model("Contractor", contractorSchema);