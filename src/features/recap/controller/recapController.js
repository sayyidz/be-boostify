// controllers/attendanceRecapController.js
const { getAttendanceRecap } = require('../services/recapService');

const getAttendanceRecapController = async (req, res) => {
    try {
        const { page = 1, limit = 8 } = req.query; // Default to page 1 and limit 8 if not provided

        const recapData = await getAttendanceRecap(Number(page), Number(limit));

        res.status(200).json({
            success: true,
            payload: recapData.attendances,
            pagination: {
                totalItems: recapData.total,
                totalPages: recapData.totalPages,
                currentPage: recapData.currentPage,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the attendance recap data',
            error: error.message,
        });
    }
};

module.exports = getAttendanceRecapController;
