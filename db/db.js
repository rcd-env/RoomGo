const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

const connectDB = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Connection Successful");
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectDB;
