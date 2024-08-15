// services/attendanceService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAttendanceRecap = async (page = 1, limit = 8) => {
    const skip = (page - 1) * limit;

    // Grouping data by name and counting total attendance for each user
    const groupedAttendance = await prisma.assisstant.groupBy({
        by: ['name'],
        _count: {
            name: true,
        },
        orderBy: {
            _count: {
                name: 'desc', // Order by attendance count (number of times a name appears)
            },
        },
        skip,
        take: limit,
    });

    // Get the total number of distinct names (for pagination purposes)
    const totalNames = await prisma.assisstant.groupBy({
        by: ['name'],
        _count: {
            name: true,
        },
    });

    return {
        attendances: groupedAttendance,
        total: totalNames.length,
        currentPage: page,
        totalPages: Math.ceil(totalNames.length / limit),
    };
};

module.exports = {
    getAttendanceRecap,
};
