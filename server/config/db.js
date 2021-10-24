const mongoose = require("mongoose");
const voucher = require('../models/voucherModel');

const connectDB = async () => {
  try {
    //database Name
    const databaseName = 'moweb';
    const con = await mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected : ${con.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectDB;