const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  // res.cookie('jwt', token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production', // Hanya kirim melalui HTTPS di production
  //   maxAge: 3600000, // 1 jam
  // });

  const data = {
    status: true,
    message: "success",
    payload,
    token
  };

  return data;
};

module.exports = { loginUser };