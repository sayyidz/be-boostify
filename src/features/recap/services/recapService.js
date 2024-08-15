const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAttendanceRecap = async (page = 1, limit = 5) => {
    const topLimit = 3;
    let skip = (page - 1) * limit;

    const topAttendances = page === 1 ? await prisma.assisstant.groupBy({
        by: ['name'],
        _count: {
            name: true,
        },
        orderBy: {
            _count: {
                name: 'desc',
            },
        },
        take: topLimit,
    }) : [];

    const topNames = topAttendances.map(item => item.name);

    if (page === 1) {
        skip = 0;
    } else {
        skip += topLimit;
    }

    const otherAttendances = await prisma.assisstant.groupBy({
        by: ['name'],
        _count: {
            name: true,
        },
        orderBy: {
            _count: {
                name: 'desc',
            },
        },
        where: {
            name: {
                notIn: topNames,
            },
        },
        skip,
        take: limit,
    });

    const allAttendances = [...topAttendances, ...otherAttendances];

    const attendances = await Promise.all(
        allAttendances.map(async (item) => {
            const assistant = await prisma.assisstant.findFirst({
                where: { name: item.name },
                select: {
                    assisstant_code: true,
                },
            });
            return {
                name: item.name,
                assisstant_code: assistant.assisstant_code,
                totalAttendance: item._count.name,
            };
        })
    );

    const totalNames = await prisma.assisstant.groupBy({
        by: ['name'],
        _count: {
            name: true,
        },
    });

    return {
        attendances,
        total: totalNames.length,
        currentPage: page,
        totalPages: Math.ceil((totalNames.length - topLimit) / limit) + 1,
    };
};

module.exports = {
    getAttendanceRecap,
};
