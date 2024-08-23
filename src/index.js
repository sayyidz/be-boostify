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
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.use("/api", Routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});