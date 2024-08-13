const Attendance = require('../models/attendanceModel');

// Get all attendance records
exports.getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new attendance record
exports.addAttendance = async (req, res) => {
    const { name, code, time } = req.body;

    if (!name || !code || !time) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        const newAttendance = new Attendance({
            name,
            code,
            time,
        });

        await newAttendance.save();
        res.status(201).json({ message: 'Attendance recorded' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
