const router = require("express").Router();
const controller = require("../controllers/zip.controller");
const protect = require("../middleware/auth.middleware");

router.post("/", protect, controller.createZip);
router.get("/", protect, controller.getAllZips);

module.exports = router;