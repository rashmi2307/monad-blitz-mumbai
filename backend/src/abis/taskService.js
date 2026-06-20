async function executeJob(input, simulateBadDelivery = false) {
    if (simulateBadDelivery) {
        return {
            success: true,
            output: "bad",
            quality: "low",
        };
    }

    const output = input.slice(0, 150) + "...";

    return {
        success: true,
        output,
        quality: "medium",
    };
}

module.exports = {
    executeJob,
};