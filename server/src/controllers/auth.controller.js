const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");

const generateToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.register = asyncHandler(async (req, res) => {
    const user = await User.create(req.body);
    const token = generateToken(user);
    res.status(201).json({ success: true, token });
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: "Invalid credentials" });
    const token = generateToken(user);
    res.json({ success: true, token });
});