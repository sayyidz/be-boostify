const { deleteUserImageUrl } = require('../services/deleteImageService');
const jwt = require('jsonwebtoken');

const deleteUserImage = async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed.' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decodedToken;

        // Call the service to delete the image URL
        const updatedUser = await deleteUserImageUrl(id);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ message: 'User imageUrl deleted successfully.', updatedUser });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Failed to delete user imageUrl.', error: error.message });
    }
};

module.exports = deleteUserImage;
