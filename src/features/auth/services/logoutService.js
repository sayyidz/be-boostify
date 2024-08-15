const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const logoutUser = async (token) => {
    try {
        // Decode token untuk mendapatkan informasi pengguna (Opsional)
        const decoded = jwt.decode(token);

        // Simpan token ke dalam database (Blacklisted)
        await prisma.blacklistedtoken.create({
            data: {
                token: token,
            },
        });

        return { success: true, message: "Logout successful and token blacklisted." };
    } catch (error) {
        console.error('Error during logout:', error);
        return { success: false, message: "An error occurred during logout." };
    }
};

module.exports = {
    logoutUser,
};
