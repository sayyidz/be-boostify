const express = require('express');
// const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
// const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Register a new user
app.post('/register', async (req, res) => {
    const { email, name, password } = req.body;
    
    try {
        // Create a new user in the database
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password, // In production, make sure to hash the password before storing it
            },
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'User registration failed' });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
