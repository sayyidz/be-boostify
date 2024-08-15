const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAttendance = async (page = 1, limit = 5) => {
    const assistances = await prisma.assisstant.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { time: 'desc' },
    });

    const total = await prisma.assisstant.count();

    // Format the time to include the day in the output
    const formattedAssistances = assistances.map(record => ({
        ...record,
        formattedTime: record.time.toLocaleDateString('en-US', {
            weekday: 'long',  // Include the full day name (e.g., "Monday")
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }));

    return {
        assistances: formattedAssistances,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
    };
};

module.exports = {
    getAttendance,
};
