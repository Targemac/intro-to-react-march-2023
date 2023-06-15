const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.

const connectDB = async () => {
  try {
    let con = await mongoose.connect("mongodb://127.0.0.1:27017/e-shop");
    
      if (con) {
      console.log("MongoDB Connection Succeeded.");
    }
  } catch (error) {
    console.log("Error in DB connection: " + error);
  }
};

module.exports = connectDB;
