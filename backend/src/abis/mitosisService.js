const agents = require("../data/agents");

function canMitosis(agent) {
    return agent.balance >= agent.mitosisThreshold;
}

function createChildAgent(parentAgent) {
    const childBalance = parentAgent.balance / 2;
    parentAgent.balance = childBalance;

    const childAgent = {
        id: "agent-b1",
        tokenId: null,
        name: "Agent B1",
        role: "Child Service Agent",
        parent: parentAgent.tokenId,
        wallet: process.env.AGENT_B1_WALLET || "0xCHILD",
        description: "A clone of Agent B created through agent mitosis.",
        endpoint: "http://localhost:4000/job",
        balance: childBalance,
        mitosisThreshold: parentAgent.mitosisThreshold,
        children: [],
    };

    parentAgent.children.push(childAgent.id);
    agents.child = childAgent;

    return {
        parentAgent,
        childAgent,
        split: {
            parentBalance: parentAgent.balance,
            childBalance,
        },
    };
}

module.exports = {
    canMitosis,
    createChildAgent,
};