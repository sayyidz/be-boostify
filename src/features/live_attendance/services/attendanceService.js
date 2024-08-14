const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAttendance = async (page = 1, limit = 5) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to midnight for the start of the day

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Set to the start of the next day

    const assistances = await prisma.assisstant.findMany({
        where: {
            time: {
                gte: today,
                lt: tomorrow,
            },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { time: 'desc' },
    });

    const total = await prisma.assisstant.count({
        where: {
            time: {
                gte: today,
                lt: tomorrow,
            },
        },
    });

    return {
        assistances,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
    };
};

module.exports = {
    getAttendance,
};
