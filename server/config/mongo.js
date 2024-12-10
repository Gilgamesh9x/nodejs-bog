const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
