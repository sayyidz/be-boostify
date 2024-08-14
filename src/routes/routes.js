const express = require('express');
const router = express.Router();
const loginController = require("../features/auth/controller/loginController");
const loginMiddleware = require("../middlewares/authMiddleware");
const attendanceController = require('../features/live_attendance/controller/attendanceController');

router.get('/attendances', attendanceController);
router.post("/login", loginController);
router.get("/user", loginMiddleware);

module.exports = router;