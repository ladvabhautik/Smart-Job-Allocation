const router = require("express").Router();
const controller = require("../controllers/job.controller");
const protect = require("../middleware/auth.middleware");

router.post("/", protect, controller.createJob);
router.get("/", protect, controller.getAllJobs);

module.exports = router;