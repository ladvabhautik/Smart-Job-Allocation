const Contractor = require("../models/contractor.model");
const asyncHandler = require("../utils/asyncHandler");

exports.createContractor = asyncHandler(async (req, res) => {
    const contractor = await Contractor.create(req.body);
    res.status(201).json({ success: true, data: contractor });
});

exports.getAllContractors = asyncHandler(async (req, res) => {
    const contractors = await Contractor.find();
    res.json({ success: true, data: contractors });
});