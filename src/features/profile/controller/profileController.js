const { getImageUrl } = require('../services/profileService');

const getImageUrlController = (req, res) => {
    try {
        const user = req.user; // Extracted from the token by the middleware
        const { fileName } = req.params;

        if (!user || !user.name) {
            return res.status(400).json({
                success: false,
                message: 'User name is required to fetch the image URL',
            });
        }

        if (!fileName.includes(user.name)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. File name does not match the user.',
            });
        }

        const url = getImageUrl(fileName, user.name);

        return res.status(200).json({
            url: url
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

module.exports = getImageUrlController;
