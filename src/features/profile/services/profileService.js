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