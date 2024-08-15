const { logoutUser } = require('../services/logoutService');

const logoutController = async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            message: "No token provided",
        });
    }

    const token = authorization.split(" ")[1];

    const result = await logoutUser(token);

    if (result.success) {
        res.status(200).json({
            success: true,
            message: result.message,
        });
    } else {
        res.status(500).json({
            success: false,
            message: result.message,
        });
    }
};

module.exports = logoutController;
