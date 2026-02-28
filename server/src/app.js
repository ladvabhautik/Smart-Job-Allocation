const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error.middleware");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/contractors", require("./routes/contractor.routes"));
app.use("/api/jobs", require("./routes/job.routes"));
app.use("/api/bids", require("./routes/bid.routes"));
app.use("/api/zips", require("./routes/zip.routes"));

app.use(errorHandler);

module.exports = app;