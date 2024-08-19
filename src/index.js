const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Routes = require("./routes/routes");
const attendanceRoutes = require('./routes/routes');
const personalRecords = require('./routes/routes');
const cors = require('cors');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api", Routes);

const allowedOrigins = [
  "https://6ccd-103-233-100-227.ngrok-free.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
