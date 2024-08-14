const express = require('express');
const router = express.Router();
const loginController = require("../features/auth/controller/loginController");
const loginMiddleware = require("../middlewares/authMiddleware");
const attendanceController = require('../features/live_attendance/controller/attendanceController');
const personalRecordsController = require('../features/personalrecords/controller/personalrecController');

router.get('/attendances', attendanceController);
router.get('/personalrec', personalRecordsController);
// router.post('/personalrec', personalRecordsController);
router.post("/login", loginController);
router.get("/user", loginMiddleware);

module.exports = router;