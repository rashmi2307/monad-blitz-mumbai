const express = require("express");
const router = express.Router();

const { summarizeText } = require("../services/taskService");

router.post("/execute", async (req, res) => {
    try {
        const { inputText, simulateBadDelivery } = req.body;

        if (!inputText) {
            return res.status(400).json({
                error: "inputText is required"
            });
        }

        const result = await summarizeText(inputText, simulateBadDelivery);

        res.json({
            taskId: "task-" + Date.now(),
            jobType: "summarization",
            inputText,
            result,
            status: "completed"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Task execution failed"
        });
    }
});

module.exports = router;


const agents = require("../data/agents");
const { submitFeedback } = require("../services/blockchainService");

router.post("/approve", async (req, res) => {
    try {
        const { taskId } = req.body;

        const serviceAgent = agents.service;

        const feedback = {
            agentWallet: serviceAgent.wallet,
            rating: 5,
            feedbackType: "positive",
            reason: "Client agent approved the completed task."
        };

        const chainResult = await submitFeedback(feedback);

        res.json({
            taskId,
            approved: true,
            feedback,
            chainResult
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Approval failed"
        });
    }
});