// controllers/attendanceController.js
const { getAttendanceByName } = require('../services/personalrecServices');

const getAttendanceByNameController = async (req, res) => {
    try {
        const { name } = req.query;
        const { page, limit } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required to fetch attendance records',
            });
        }

        const attendanceData = await getAttendanceByName(name, Number(page) || 1, Number(limit) || 5);

        res.status(200).json({
            success: true,
            payload: attendanceData.assistances,
            pagination: {
                totalAttendance: attendanceData.total,
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

module.exports = getAttendanceByNameController;
