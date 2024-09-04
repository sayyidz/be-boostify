const { addAttendance } = require('../services/sendDataService');

const addAttendanceController = async (req, res) => {
    try {
        const { assisstant_code, name, time } = req.body;

        if (!assisstant_code || !name || !time) {
            return res.status(400).json({
                success: false,
                message: 'assisstant_code, name, and time are required fields',
            });
        }

        const newAttendance = await addAttendance({ assisstant_code, name, time });

        res.status(201).json({
            success: true,
            message: 'Attendance added successfully',
            data: newAttendance,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while adding attendance',
            error: error.message,
        });
    }
};

module.exports = addAttendanceController;
