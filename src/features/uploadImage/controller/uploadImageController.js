const { updateUserImageUrl } = require('../services/uploadImageService');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage }).single('image'); // Single file upload with key 'image'

const patchUserImageUrl = async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed.' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decodedToken;

        // Use multer to handle the file upload
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'File upload failed.', error: err.message });
            }

            const imageFile = req.file;

            if (!imageFile) {
                return res.status(400).json({ message: 'Image file is required.' });
            }

            // Call the service to update the image URL
            const updatedUser = await updateUserImageUrl(id, imageFile);

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found.' });
            }

            res.json({ message: 'User imageUrl updated successfully.', updatedUser });
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Failed to update user imageUrl.', error: error.message });
    }
};

module.exports = patchUserImageUrl;
