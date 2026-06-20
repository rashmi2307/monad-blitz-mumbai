const express = require("express");
const router = express.Router();

const agents = require("../data/agents");
const { executeJob } = require("../services/taskService");

router.post("/", async (req, res) => {
    try {
        const { input, simulateBadDelivery } = req.body;

        if (!input) {
            return res.status(400).json({
                error: "input is required",
            });
        }

        const result = await executeJob(input, simulateBadDelivery);

        res.json({
            jobId: "job-" + Date.now(),
            clientAgent: agents.client,
            serviceAgent: agents.service,
            input,
            result,
            status: "completed",
        });
    } catch (error) {
        res.status(500).json({
            error: "Job execution failed",
            details: error.message,
        });
    }
});

module.exports = router;