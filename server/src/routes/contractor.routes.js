const router = require("express").Router();
const controller = require("../controllers/contractor.controller");
const protect = require("../middleware/auth.middleware");

router.post("/", protect, controller.createContractor);
router.get("/", protect, controller.getAllContractors);

module.exports = router;