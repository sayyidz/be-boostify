// controllers/userController.js
const userService = require('../services/whoamiServices');

const whoAmI = async (req, res) => {
    try {
        const userInfo = await userService.getUserInfo(req.user.id);
        
        if (!userInfo) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            id: userInfo.id,       // Syncs with 'id' field in User model
            name: userInfo.name,   // Syncs with 'name' field in User model
            email: userInfo.email, // Syncs with 'email' field in User model
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = whoAmI;

