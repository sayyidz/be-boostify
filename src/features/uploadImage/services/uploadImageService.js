const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const imagekit = require('../../../config/imagekit');

const updateUserImageUrl = async (id, imageFile) => {
    try {
        // Upload image to ImageKit
        const uploadResponse = await imagekit.upload({
            file: imageFile.buffer.toString('base64'), // Convert buffer to base64 string
            fileName: `user-${id}-${Date.now()}` // Unique file name
            folder: '/Boostify'
        });

        const imageUrl = uploadResponse.url;

        // Update user with the new image URL
        const updatedUser = await prisma.assisstant.update({
            where: { id },
            data: { imageUrl }
        });

        return updatedUser;
    } catch (error) {
        console.error('Error updating user imageUrl:', error);
        throw error;
    }
};

module.exports = {
    updateUserImageUrl,
};
