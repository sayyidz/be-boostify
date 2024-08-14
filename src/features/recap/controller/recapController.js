// const {
//     getTopThreeAttendances,
//     getUsersBelowTopThree,
//   } = require('../services/attendanceService');
  
//   const getAttendances = async (req, res) => {
//     const { page } = req.query;
//     const pageNumber = Number(page) || 1;
  
//     try {
//       if (pageNumber === 1) {
//         const topThreeUsers = await getTopThreeAttendances();
//         const topUserIds = topThreeUsers.map(user => user.user.id);
//         const nextFiveUsers = await getUsersBelowTopThree(topUserIds, 1);
  
//         res.json({
//           topThree: topThreeUsers,
//           users: nextFiveUsers,
//         });
//       } else {
//         const topThreeUsers = await getTopThreeAttendances();
//         const topUserIds = topThreeUsers.map(user => user.user.id);
//         const users = await getUsersBelowTopThree(topUserIds, pageNumber);
  
//         res.json({
//           users,
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'An error occurred' });
//     }
//   };
  
//   module.exports = {
//     getAttendances,
//   };

const { getAttendanceRecap } = require('../services/recapService');

const getAttendanceRecapController = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;

        const attendanceData = await getAttendanceRecap(page, limit);

        res.status(200).json({
            success: true,
            payload: attendanceData.attendances,
            pagination: {
                totalItems: attendanceData.total,
                totalPages: attendanceData.totalPages,
                currentPage: attendanceData.currentPage,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching attendance data',
            error: error.message,
        });
    }
};

module.exports = getAttendanceRecapController;