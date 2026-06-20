function judgeDispute({ input, output }) {
    const reasons = [];

    if (!output || output.trim().length === 0) {
        reasons.push("Output is empty.");
    }

    if (output.trim().toLowerCase() === "bad") {
        reasons.push("Demo bad-output trigger detected.");
    }

    if (output.length < 30) {
        reasons.push("Output is too short.");
    }

    const guilty = reasons.length > 0;

    return {
        verdict: guilty ? "SERVICE_AGENT_GUILTY" : "DISPUTE_DISMISSED",
        guilty,
        score: guilty ? 2 : 9,
        reasons: guilty
            ? reasons
            : ["Output passes the court quality rules."],
        judge: "Agent Court v1",
        timestamp: new Date().toISOString(),
    };
}

module.exports = {
    judgeDispute,
};