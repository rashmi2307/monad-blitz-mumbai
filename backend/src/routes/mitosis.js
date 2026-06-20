const express = require("express");
const router = express.Router();

const agents = require("../data/agents");
const { canMitosis, createChildAgent } = require("../services/mitosisService");
const { spawnChildAgent } = require("../services/blockchainService");

router.post("/", async (req, res) => {
    try {
        const parentAgent = agents.service;

        if (!canMitosis(parentAgent)) {
            return res.status(400).json({
                allowed: false,
                reason: "Agent balance is below mitosis threshold.",
                balance: parentAgent.balance,
                threshold: parentAgent.mitosisThreshold,
            });
        }

        const mitosisResult = createChildAgent(parentAgent);

        const chainResult = await spawnChildAgent({
            parentTokenId: parentAgent.tokenId,
            childWallet: mitosisResult.childAgent.wallet,
            childAgentCard: mitosisResult.childAgent,
        });

        mitosisResult.childAgent.tokenId = chainResult.childTokenId;

        res.json({
            allowed: true,
            event: "AGENT_MITOSIS_COMPLETE",
            parent: mitosisResult.parentAgent,
            child: mitosisResult.childAgent,
            split: mitosisResult.split,
            chainResult,
        });
    } catch (error) {
        res.status(500).json({
            error: "Mitosis failed",
            details: error.message,
        });
    }
});

module.exports = router;