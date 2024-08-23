const { getAttendanceRecap } = require('../services/recapService');

const getAttendanceRecapController = async (req, res) => {
    try {
        const { page = 1, limit = 5, untilDate } = req.query;
        const recapData = await getAttendanceRecap(Number(page), Number(limit), untilDate);

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
