const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const registerUser = async (name, email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    if (password.length < 6) {
        return {
            status: false,
            message: "Password must be longer than 6 characters."
        };
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const result =  await prisma.user.create({
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