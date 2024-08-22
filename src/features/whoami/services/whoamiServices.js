// services/userService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserInfo = async (userId) => {
    try {
        return await prisma.assisstant.findUnique({
            where: { id: userId }, // This corresponds to the 'id' field in your User model
        });
    } catch (error) {
        throw new Error('Error retrieving user information.');
    }
};

module.exports = {
    getUserInfo,
};
