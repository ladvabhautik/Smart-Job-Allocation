const calculateScore = require("../services/ranking.service");

describe("Ranking Logic Tests", () => {

    const contractor = {
        rating: 5,
        completionRate: 90,
        avgResponseTime: 10,
        activeJobs: 0
    };

    const urgentJob = { urgency: "Urgent" };
    const normalJob = { urgency: "Normal" };

    test("Urgent job increases response weight", async () => {
        const normalScore = await calculateScore(
            contractor,
            10,
            normalJob,
            80
        );

        const urgentScore = await calculateScore(
            contractor,
            10,
            urgentJob,
            80
        );

        expect(urgentScore).toBeGreaterThan(normalScore);
    });

    test("Penalty applied when activeJobs >= 5", async () => {
        const penalizedContractor = {
            ...contractor,
            activeJobs: 5
        };

        const score = await calculateScore(
            penalizedContractor,
            10,
            normalJob,
            80
        );

        expect(score).toBeLessThan(100);
    });

    test("Trade match impacts score", async () => {
        const lowTrade = await calculateScore(
            contractor,
            10,
            normalJob,
            20
        );

        const highTrade = await calculateScore(
            contractor,
            10,
            normalJob,
            90
        );

        expect(highTrade).toBeGreaterThan(lowTrade);
    });
});