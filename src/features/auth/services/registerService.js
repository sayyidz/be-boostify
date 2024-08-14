const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const registerUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result =  await prisma.users.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    return {
        status: true,
        message: "Account created"
    }
}

module.exports = { registerUser }