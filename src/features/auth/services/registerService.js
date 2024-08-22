const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const registerUser = async (name, assisstant_code, password) => {

    if (password.length < 6) {
        return {
            status: false,
            message: "Password must be longer than 6 characters."
        };
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const result =  await prisma.assisstant.create({
        data: {
            name,
            assisstant_code,
            password: hashedPassword
        }
    });

    return {
        status: true,
        message: "Account created"
    }
}

module.exports = { registerUser }