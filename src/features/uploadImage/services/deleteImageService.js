const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const deleteUserImageUrl = async (id) => {
    try {
        // Update user to set imageUrl to null
        const updatedUser = await prisma.assisstant.update({
            where: { id },
            data: { imageUrl: null } // Set imageUrl to null
        });

        return updatedUser;
    } catch (error) {
        console.error('Error deleting user imageUrl:', error);
        throw error;
    }
};

module.exports = {
    deleteUserImageUrl,
};
