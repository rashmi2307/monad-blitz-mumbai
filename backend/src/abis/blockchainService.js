const reputationService = require("./reputationService");
const treasuryService = require("./treasuryService");
const identityService = require("./identityService");

async function submitFeedback({ agentWallet, value, tags, reason }) {
    return await reputationService.submitFeedback({
        agentWallet,
        value,
        tags,
        reason,
    });
}

async function spawnChildAgent({ parentTokenId, childWallet, childAgentCard }) {
    const identityResult = await identityService.registerAgent({
        wallet: childWallet,
        agentCard: childAgentCard,
        parentTokenId,
    });

    const treasuryResult = await treasuryService.splitBalance({
        parentTokenId,
        childWallet,
    });

    return {
        success: true,
        childTokenId: identityResult.tokenId || identityResult.childTokenId,
        txHash: identityResult.txHash,
        explorerUrl: identityResult.explorerUrl,
        identityResult,
        treasuryResult,
    };
}

module.exports = {
    submitFeedback,
    spawnChildAgent,
};