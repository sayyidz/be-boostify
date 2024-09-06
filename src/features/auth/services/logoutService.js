const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const logoutUser = async (token) => {
    try {
        const decoded = jwt.decode(token);
        await prisma.blacklistedToken.create({
            data: {
                token: token,
                createdAt: new Date(),
            },
        });

        return {
            success: true,
            message: "Logout successful and token blacklisted."
        };
    } catch (error) {
        console.error('Error during logout:', error);
        return {
            success: false,
            message: "An error occurred during logout."
        };
    }
};

const deleteExpiredTokens = async () => {
    const tenHoursAgo = new Date(Date.now() - 60 * 1000);

    try {
        const deletedTokens = await prisma.blacklistedToken.deleteMany({
            where: { createdAt: { lt: tenHoursAgo } },
        });

        console.log(`Deleted ${deletedTokens.count} expired tokens.`);
    } catch (error) {
        console.error('Error deleting expired tokens:', error);
    }
};

module.exports = {
    logoutUser,
    deleteExpiredTokens
};
