const mongoose = require("mongoose");

const zipSchema = new mongoose.Schema({
    zipCode: { type: String, unique: true, required: true },
    mobility: { type: Number, min: 0, max: 100, required: true },
    businessActivity: { type: Number, min: 0, max: 100, required: true },
    demographicFit: { type: Number, min: 0, max: 100, required: true },
    seasonalDemand: { type: Number, min: 0, max: 100, required: true },
    finalScore: Number
});

zipSchema.pre("save", function (next) {
    this.finalScore =
        0.30 * this.mobility +
        0.25 * this.businessActivity +
        0.20 * this.demographicFit +
        0.25 * this.seasonalDemand;
    next();
});

module.exports = mongoose.model("Zip", zipSchema);