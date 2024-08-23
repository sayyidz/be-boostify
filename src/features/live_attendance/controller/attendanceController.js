const { getAttendance } = require('../services/attendanceService');

const getAttendanceController = async (req, res) => {
    const { page = 1, limit = 5 } = req.query; // Set default values for page and limit
    const attendanceData = await getAttendance(Number(page), Number(limit));

    res.json(attendanceData);
};

module.exports = getAttendanceController;
