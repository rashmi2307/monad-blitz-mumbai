const express = require("express");
const router = express.Router();

const agents = require("../data/agents");
const { judgeDispute } = require("../services/courtService");
const { submitFeedback } = require("../services/blockchainService");

router.post("/", async (req, res) => {
    try {
        const { jobId, input, output } = req.body;

        if (!input || !output) {
            return res.status(400).json({
                error: "input and output are required",
            });
        }

        const courtResult = judgeDispute({ input, output });

        const feedbackPayload = courtResult.guilty
            ? {
                agentWallet: agents.service.wallet,
                value: -1,
                tags: ["court-guilty", "bad-delivery"],
                reason: "Agent Court ruled service agent guilty.",
            }
            : {
                agentWallet: agents.service.wallet,
                value: 1,
                tags: ["court-dismissed", "valid-work"],
                reason: "Agent Court dismissed the dispute.",
            };

        const chainResult = await submitFeedback(feedbackPayload);

        res.json({
            disputeId: "dispute-" + Date.now(),
            jobId,
            courtResult,
            feedback: feedbackPayload,
            chainResult,
        });
    } catch (error) {
        res.status(500).json({
            error: "Dispute failed",
            details: error.message,
        });
    }
});

module.exports = router;