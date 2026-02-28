const calculateScore = require("../src/services/ranking.service");

test("Penalty applied when 5 active jobs", () => {
    const contractor = {
        rating: 5,
        completionRate: 100,
        avgResponseTime: 10,
        activeJobs: 5
    };

    const job = { urgency: "Normal" };

    const score = calculateScore(contractor, 10, job);
    expect(score).toBeLessThan(100);
});