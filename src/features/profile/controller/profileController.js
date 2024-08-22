<<<<<<< HEAD
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
=======
const { getImageByUserName } = require('../services/profileService');

const getImageByUserNameController = async (req, res) => {
    try {
      // Ambil URL gambar dari service
      const imageUrl = await getImageByUserName(req.user.id);
  
      // Kirim URL gambar sebagai respons
      return res.json({ imageUrl });
    } catch (error) {
      console.log(error); // Log error untuk melihat detailnya
      if (error.message === 'User not found' || error.message === 'Image not found') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'An error occurred' });
    }
  };
  

module.exports = getImageByUserNameController;
>>>>>>> 77ceec975e8eb116bd1630de1a80375f115e0dec
