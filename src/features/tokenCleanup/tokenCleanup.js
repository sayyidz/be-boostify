// tokenCleanupScheduler.js
const cron = require('node-cron');
const tokenService = require('../auth/services/logoutService');

cron.schedule('0 * * * *', async () => {
    console.log("Cron job is running.");
    try {
        await tokenService.deleteExpiredTokens();
        console.log("Expired tokens removed successfully.");
    } catch (error) {
        console.error("Failed to remove expired tokens:", error);
    }
});
