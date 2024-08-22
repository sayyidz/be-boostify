<<<<<<< HEAD
require('dotenv').config();

const getImageUrl = (fileName, userName) => {
    const baseUrl = process.env.IMAGEKIT_URL_ENDPOINT;

    if (!fileName || !userName) {
        throw new Error('File name and user name are required to retrieve the image URL.');
    }

    // You can add any logic here to validate or customize the fileName based on the userName if needed.
    // For now, we just concatenate the base URL with the file name.
    const imageUrl = `${baseUrl}${fileName}`;
    return imageUrl;
};

module.exports = {
    getImageUrl
};
=======
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getImageByUserName = async (userId) => {
    // Ambil nama pengguna dari model User
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    // Cari pada model Assistant berdasarkan nama
    const assistant = await prisma.assisstant.findUnique({
      where: { name: user.name },
    });
  
    if (!assistant || !assistant.imageUrl) {
      throw new Error('Image not found');
    }
  
    // Kembalikan URL gambar
    return assistant.imageUrl;
  };
  
  module.exports = { getImageByUserName };
>>>>>>> 77ceec975e8eb116bd1630de1a80375f115e0dec
