const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAttendanceRecap = async (page = 1, limit = 5, untilDate) => {
    const topLimit = 3;
    let skip = (page - 1) * limit;

    // Pastikan untilDate termasuk waktu maksimal pada hari itu
    const dateFilter = untilDate ? new Date(`${untilDate}T23:59:59.999Z`) : undefined;
    console.log('Filter until date:', dateFilter); // Log for debugging

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
                where: { 
                    name: item.name, 
                    time: dateFilter ? { lte: dateFilter } : undefined 
                },
                select: {
                    assisstant_code: true,
                    time: true,
                },
                orderBy: {
                    time: 'desc',
                },
            });

            if (!assistant) {
                console.log(`No attendance found for ${item.name} before ${dateFilter}`);
                return null;
            }

            return {
                name: item.name,
                assisstant_code: assistant.assisstant_code,
                lastAttendance: assistant.time,
                totalAttendance: item._count.name,
            };
        })
    );

    const filteredAttendances = attendances.filter(item => item !== null);

    const totalNames = await prisma.assisstant.groupBy({
        by: ['name'],
        _count: {
            name: true,
        },
        where: {
            time: dateFilter ? { lte: dateFilter } : undefined,
        },
    });

    return {
        attendances: filteredAttendances,
        total: totalNames.length,
        currentPage: page,
        totalPages: Math.ceil((totalNames.length - topLimit) / limit) + 1,
    };
};

module.exports = {
    getAttendanceRecap,
};
