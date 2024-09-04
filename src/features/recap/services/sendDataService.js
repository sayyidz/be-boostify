const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addAttendance = async ({ assisstant_code, name, time }) => {
    try {
        const newAttendance = await prisma.attendance.create({
            data: {
                assisstant_code,
                name,
                time,
            },
        });
        return newAttendance;
    } catch (error) {
        throw new Error('Error adding attendance: ' + error.message);
    }
};

module.exports = {
    addAttendance,
};
