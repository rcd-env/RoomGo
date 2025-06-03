const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const engine = require("ejs-mate");
const List = require("./models/list.js");
require("dotenv").config();
const ExpressError = require("./utils/ExpressError.js");
const listSchema = require("./ListSchemaVal.js");

const PORT = process.env.PORT || 5500;
const MONGO_URL = "mongodb://127.0.0.1:27017/RoomGo";

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.render("home");
});
// index route
app.get("/lists", async (req, res) => {
  try {
    let lists = await List.find({});
    res.render("lists/index.ejs", { lists });
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error.");
  }
});
//create route
app.get("/lists/new", (req, res, next) => {
  try {
    res.render("lists/create");
  } catch (error) {
    next(error);
  }
});

app.post("/lists", async (req, res, next) => {
  try {
    let result = listSchema.validate(req.body);
    if (result.error) next(result.error);
    else {
      let { title, description, image, price, location, country } = req.body;
      await List.create({
        title,
        description,
        image: {
          url: image,
          filename: "listingimage",
        },
        price,
        location,
        country,
      });
      res.redirect("/lists");
    }
  } catch (error) {
    next(error);
  }
});

//show route
app.get("/lists/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let list = await List.findOne({ _id: id });
    res.render("lists/show", { list });
  } catch (error) {
    next(error);
  }
});

//update route
app.get("/lists/:id/edit", async (req, res, next) => {
  try {
    let { id } = req.params;
    let list = await List.findById(id);
    console.log(list);
    res.render("lists/edit", { list });
  } catch (error) {
    next(error);
  }
});

app.post("/lists/:id", async (req, res, next) => {
  try {
    let result = listSchema.validate(req.body);
    if (result.error) next(result.error);
    else {
      let { id } = req.params;
      let { title, description, image, price, location, country } = req.body;
      await List.findByIdAndUpdate(id, {
        title,
        description,
        image: {
          url: image,
          filename: "listingimage",
        },
        price,
        location,
        country,
      });
      res.redirect(`/lists/${id}`);
    }
  } catch (error) {
    next(error);
  }
});

//delete route

app.get("/lists/:id/delete", async (req, res, next) => {
  try {
    let { id } = req.params;
    await List.findByIdAndDelete(id);
    res.redirect("/lists");
  } catch (error) {
    next(error);
  }
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found."));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Internal Server Error." } = err;
  res.status(status).render("error.ejs", { message });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
