const router = require("express").Router();
const controller = require("../controllers/bid.controller");
const protect = require("../middleware/auth.middleware");

router.post("/", protect, controller.createBid);
router.get("/", protect, controller.getAllBids);
router.get("/:jobId", protect, controller.getRankedBids);
router.patch("/override/:bidId", protect, controller.adminOverride);

module.exports = router;