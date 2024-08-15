const express = require('express');
const router = express.Router();

const loginController = require("../features/auth/controller/loginController");
const registerController = require("../features/auth/controller/registerController")
const recapController = require("../features/recap/controller/recapController");
const loginMiddleware = require("../middlewares/authMiddleware");
const attendanceController = require('../features/live_attendance/controller/attendanceController');
const personalRecordsController = require('../features/personalrecords/controller/personalrecController');

router.get('/attendances', attendanceController);
router.get('/personalrec', personalRecordsController);

router.post("/auth/login", loginController);
router.post("/auth/register", registerController);
router.get("/recap", recapController)

module.exports = router;