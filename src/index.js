const express = require('express');
// const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
require('dotenv').config();   
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.use("/api", Routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
