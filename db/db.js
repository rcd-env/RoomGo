const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/RoomGo";

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
