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

    const formattedAttendances = assistances.map(record => ({
        time: record.time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        rawTime: record.time
    }));

    return {
        name,
        assistanceCode: assistances[0].assisstant_code,
        attendancesTime: formattedAttendances,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
    };
};

module.exports = {
    getAttendanceByName,
};
