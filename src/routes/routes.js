const express = require('express');
const router = express.Router();

const loginController = require("../features/auth/controller/loginController");
const registerController = require("../features/auth/controller/registerController");
const logoutController = require("../features/auth/controller/logoutController");
const recapController = require("../features/recap/controller/recapController");
const attendanceController = require('../features/live_attendance/controller/attendanceController');
const personalRecordsController = require('../features/personalrecords/controller/personalrecController');
const accessValidation = require('../middlewares/authMiddleware');
const userController = require('../features/whoami/controller/whoamiController');


router.get("/recap", accessValidation ,recapController)
router.get('/attendances', accessValidation, attendanceController);
router.get('/personalrec', accessValidation, personalRecordsController);
router.get('/whoami', accessValidation, userController);

router.post("/auth/login", loginController);
router.post("/auth/register", registerController);
router.post("/auth/logout", accessValidation ,logoutController);


module.exports = router;