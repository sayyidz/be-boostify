// const Attendance = require('../models/attendanceModel');

// // Get all attendance records
// exports.getAllAttendance = async () => {
//     try {
//         const attendance = await Attendance.find();
//         return attendance;
//     } catch (error) {
//         throw new Error('Could not fetch attendance records');
//     }
// };

// // Add a new attendance record
// exports.addAttendance = async ({ name, code, time }) => {
//     if (!name || !code || !time) {
//         throw new Error('Please fill all fields');
//     }

//     const newAttendance = new Attendance({
//         name,
//         code,
//         time,
//     });

//     try {
//         await newAttendance.save();
//         return { message: 'Attendance recorded' };
//     } catch (error) {
//         throw new Error('Could not record attendance');
//     }
// };
