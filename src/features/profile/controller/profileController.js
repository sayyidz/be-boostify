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