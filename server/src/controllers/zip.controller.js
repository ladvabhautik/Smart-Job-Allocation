const Zip = require("../models/zip.model");
const asyncHandler = require("../utils/asyncHandler");

exports.createZip = asyncHandler(async (req, res) => {
    const { zipCode, mobility, businessActivity, demographicFit, seasonalDemand } = req.body;
    const finalScore = 0.3 * mobility + 0.25 * businessActivity + 0.2 * demographicFit + 0.25 * seasonalDemand;
    const zip = await Zip.create({ zipCode, mobility, businessActivity, demographicFit, seasonalDemand, finalScore });
    res.status(201).json({ success: true, data: zip });
});

exports.getAllZips = asyncHandler(async (req, res) => {
    const zips = await Zip.find();
    res.json({ success: true, data: zips });
});