const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require('./config/db');
const voucherRoutes = require("./routes/voucherRoute");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB()

app.use("/api/vouchers", voucherRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});