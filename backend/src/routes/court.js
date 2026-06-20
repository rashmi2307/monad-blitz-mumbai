const express = require("express");
const router = express.Router();

const agents = require("../data/agents");
const { evaluateDispute } = require("../services/courtService");
const { submitFeedback } = require("../services/blockchainService");

router.post("/evaluate", async (req, res) => {
    try {
        const { inputText, outputText } = req.body;

        if (!inputText || !outputText) {
            return res.status(400).json({
                error: "inputText and outputText are required"
            });
        }

        const courtResult = evaluateDispute({
            inputText,
            outputText
        });

        const serviceAgent = agents.service;

        const feedbackPayload = courtResult.passed
            ? {
                agentWallet: serviceAgent.wallet,
                rating: 5,
                feedbackType: "positive",
                reason: "Court ruled that the service agent completed the task successfully."
            }
            : {
                agentWallet: serviceAgent.wallet,
                rating: 1,
                feedbackType: "negative",
                reason: "Court ruled against the service agent due to poor task quality."
            };

        const chainResult = await submitFeedback(feedbackPayload);

        res.json({
            disputeId: "dispute-" + Date.now(),
            courtResult,
            feedbackSubmitted: feedbackPayload,
            chainResult
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Court evaluation failed"
        });
    }
});

module.exports = router;