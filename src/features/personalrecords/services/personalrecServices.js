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
            time: 'desc',
        },
        select: {
            assisstant_code: true,
            time: true,
        },
    });

    const total = await prisma.assisstant.count({ where: { name } });

    if (assistances.length === 0) {
        return null;  // Return null if no records found
    }

    const groupedData = {
        assistanceCode: assistances[0].assisstant_code,
        timestamps: assistances.map(record => record.time),
    };

    return {
        name,
        assistance: groupedData,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
    };
};

module.exports = {
    getAttendanceByName,
};
