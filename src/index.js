const express = require('express');
const app = express();
const db = require('./config/config');
const PORT = process.env.PORT || 3000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());

app.post('/register', async (req, res) => {
    const { email, name, password } = req.body;
    
    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password
        }
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'User registration failed' });
    }
  });
  
  // Get All Users
  app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
