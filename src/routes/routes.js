const express = require('express');
const router = express.Router();
const loginController = require("../features/auth/controller/loginController");
const loginMiddleware = require("../middlewares/authMiddleware");

router.post("/login", loginController.login);
router.get("/user", loginMiddleware)

module.exports = router;