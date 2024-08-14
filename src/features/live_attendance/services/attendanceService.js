// services/attendanceService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAttendance = async (page = 1, limit = 5) => {
    const assistances = await prisma.assisstant.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { time: 'desc' },
    });

    const total = await prisma.assisstant.count();

    return {
        assistances,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
    };
};

// Export as an object to make it clear you want to use a property of that object
module.exports = {
  getAttendance,
};
