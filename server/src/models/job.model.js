const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    zipCode: { type: String, index: true },
    tradeRequired: String,
    urgency: { type: String, enum: ["Normal", "Urgent"], default: "Normal" },
    assignedContractor: { type: mongoose.Schema.Types.ObjectId, ref: "Contractor" }
});

module.exports = mongoose.model("Job", jobSchema);