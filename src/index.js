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

// const allowedOrigins = [
//   "https://73n0gdqw-3000.asse.devtunnels.ms/",
//   "http://localhost:3000",
// ];

app.use(express.json());

app.use(cors());
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.use("/api", Routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
