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

        if (!attendanceData) {
            return res.status(404).json({
                success: false,
                message: 'No attendance records found for the specified name',
            });
        }

        res.status(200).json({
            success: true,
            payload: attendanceData,
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
