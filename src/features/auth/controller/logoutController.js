const logoutUser = require('../services/logoutService');

const logoutController = async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            message: "No token provided",
        });
    }

    const token = authorization.split(" ")[1];

    const result = await logoutUser.logoutUser(token);

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

const removeExpiredTokens = async (req, res) => {
    try {
        await logoutUser.deleteExpiredTokens();
        return res.status(200).json({ success: true, message: "Expired tokens removed." });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to remove expired tokens." });
    }
};

module.exports = {
    logoutController, 
    removeExpiredTokens
};
