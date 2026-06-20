const express = require("express");
const cors = require("cors");
require("dotenv").config();

const agentRoutes = require("./routes/agents");
const jobRoutes = require("./routes/job");
const feedbackRoutes = require("./routes/feedback");
const disputeRoutes = require("./routes/dispute");
const mitosisRoutes = require("./routes/mitosis");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: "Agent Court + Mitosis backend running",
    });
});

app.use("/agents", agentRoutes);
app.use("/job", jobRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/dispute", disputeRoutes);
app.use("/mitosis", mitosisRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});