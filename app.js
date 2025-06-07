const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const engine = require("ejs-mate");
require("dotenv").config();

// routers
const list = require("./routes/list.js");
const review = require("./routes/review.js");
// custom error
const ExpressError = require("./utils/ExpressError.js");
// confidentials
const PORT = process.env.PORT || 5500;
const MONGO_URL = "mongodb://127.0.0.1:27017/RoomGo";

// important tasks
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

// root route
app.get("/", (req, res) => {
  res.render("home");
});

// list routes
app.use("/lists", list);
// review routes
app.use("/lists/:id/reviews", review);

// forbideden routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found."));
});
// error handling middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Internal Server Error." } = err;
  res.status(status).render("error.ejs", { message });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
