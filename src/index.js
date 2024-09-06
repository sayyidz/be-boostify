const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const prisma = new PrismaClient();
require('./features/tokenCleanup/tokenCleanup');

const Routes = require("./routes/routes");

// Allowed origins for CORS
const allowedOrigins = [
  "https://boostify-fe.vercel.app", // Your production frontend URL
  "http://localhost:3000", // Local development URL
];

// Simplified CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from allowed origins or no origin (for non-browser requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials such as cookies, authorization headers, etc.
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Test route to verify server is running
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Main routes
app.use("/api", Routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
