// services/attendanceService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAttendanceByName = async (name, page = 1, limit = 5) => {
    const skip = (page - 1) * limit;

    const assistances = await prisma.assisstant.findMany({
        where: { name },
        skip,
        take: limit,
        orderBy: {
            time: 'desc',  // Order by time, newest first
        },
    });

    const total = await prisma.assisstant.count({ where: { name } });

    return {
        assistances,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
    };
};

module.exports = {
    getAttendanceByName,
  };
  
