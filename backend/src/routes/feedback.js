const express = require("express");
const router = express.Router();

const agents = require("../data/agents");
const { submitFeedback } = require("../services/blockchainService");

router.post("/", async (req, res) => {
    try {
        const { jobId, rating, comment } = req.body;

        if (!rating) {
            return res.status(400).json({
                error: "rating is required",
            });
        }

        const isGood = rating >= 4;

        const feedbackPayload = {
            agentWallet: agents.service.wallet,
            value: isGood ? 1 : -1,
            tags: isGood ? ["good-work", "completed"] : ["bad-work"],
            reason: comment || "Client submitted feedback.",
        };

        const chainResult = await submitFeedback(feedbackPayload);

        res.json({
            jobId,
            feedback: feedbackPayload,
            chainResult,
        });
    } catch (error) {
        res.status(500).json({
            error: "Feedback failed",
            details: error.message,
        });
    }
});

module.exports = router;