async function submitFeedback({ agentWallet, value, tags, reason }) {
    console.log("submitFeedback called:", {
        agentWallet,
        value,
        tags,
        reason,
    });

    return {
        success: true,
        txHash: "0xMOCK_FEEDBACK_TX",
        explorerUrl: "https://testnet.monadexplorer.com/tx/0xMOCK_FEEDBACK_TX",
    };
}

async function spawnChildAgent({ parentTokenId, childWallet, childAgentCard }) {
    console.log("spawnChildAgent called:", {
        parentTokenId,
        childWallet,
        childAgentCard,
    });

    return {
        success: true,
        childTokenId: "3",
        txHash: "0xMOCK_MITOSIS_TX",
        explorerUrl: "https://testnet.monadexplorer.com/tx/0xMOCK_MITOSIS_TX",
    };
}

module.exports = {
    submitFeedback,
    spawnChildAgent,
};