const { body, validationResult } = require("express-validator");

exports.validateBid = [
    body("distance")
        .isNumeric()
        .withMessage("Distance must be numeric"),

    body("tradeMatchAccuracy")
        .isInt({ min: 0, max: 100 })
        .withMessage("Trade match must be between 0-100"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();
    }
];