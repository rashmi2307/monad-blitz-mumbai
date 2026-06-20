const agents = {
    client: {
        id: "agent-a",
        tokenId: "1",
        name: "Agent A",
        role: "Client Agent",
        wallet: process.env.AGENT_A_WALLET || "0xCLIENT",
        description: "Client agent that hires service agents.",
        endpoint: "http://localhost:4000/job",
    },

    service: {
        id: "agent-b",
        tokenId: "2",
        name: "Agent B",
        role: "Service Agent",
        wallet: process.env.AGENT_B_WALLET || "0xSERVICE",
        description: "Service agent that summarizes text.",
        endpoint: "http://localhost:4000/job",
        balance: 100,
        mitosisThreshold: 80,
        children: [],
    },

    child: null,
};

module.exports = agents;