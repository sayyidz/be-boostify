// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const getTopThreeAttendances = async () => {
//   const topUsers = await prisma.attendance.groupBy({
//     by: ['userId'],
//     where: { status: 'hadir' },
//     _count: {
//       userId: true,
//     },
//     orderBy: {
//       _count: {
//         userId: 'desc',
//       },
//     },
//     take: 3,
//   });

//   const result = await Promise.all(
//     topUsers.map(async (entry) => {
//       const user = await prisma.user.findUnique({
//         where: { id: entry.userId },
//       });
//       return {
//         user,
//         totalAttendance: entry._count.userId,
//       };
//     })
//   );

//   return result;
// };

// const getUsersBelowTopThree = async (topUserIds, page = 1, limit = 5) => {
//   const offset = (page - 1) * limit;

//   const usersBelowTop = await prisma.attendance.groupBy({
//     by: ['userId'],
//     where: {
//       status: 'hadir',
//       userId: { notIn: topUserIds },
//     },
//     _count: {
//       userId: true,
//     },
//     orderBy: {
//       _count: {
//         userId: 'desc',
//       },
//     },
//     take: limit,
//     skip: offset,
//   });

//   const result = await Promise.all(
//     usersBelowTop.map(async (entry) => {
//       const user = await prisma.user.findUnique({
//         where: { id: entry.userId },
//       });
//       return {
//         user,
//         totalAttendance: entry._count.userId,
//       };
//     })
//   );

//   return result;
// };

// module.exports = {
//   getTopThreeAttendances,
//   getUsersBelowTopThree,
// };

// services/attendanceService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAttendanceRecap = async (page = 1, limit = 8) => {
    const skip = (page - 1) * limit;

    // Mengelompokkan data berdasarkan nama dan menghitung total kehadiran
    const groupedAttendance = await prisma.assistant.groupBy({
        by: ['name'],
        _count: {
            name: true,
        },
        orderBy: {
            _count: {
                name: 'desc', // Urutkan berdasarkan total kehadiran (jumlah kemunculan nama)
            },
        },
        skip,
        take: limit,
    });

    // Hitung total orang yang memiliki kehadiran
    const total = await prisma.assistant.groupBy({
        by: ['name'],
        _count: {
            name: true,
        },
    });

    return {
        attendances: groupedAttendance,
        total: total.length,
        currentPage: page,
        totalPages: Math.ceil(total.length / limit),
    };
};

module.exports = {
    getAttendanceRecap,
};
