const express = require("express");
const router = express.Router({ mergeParams: true });

//models
const List = require("../models/list.model.js");

// schema validations
const listSchemaVal = require("../utils/ListSchemaVal.js");

// index route
router.get("/", async (req, res, next) => {
  try {
    let lists = await List.find({});
    res.render("lists/index.ejs", { lists });
  } catch (error) {
    next(error);
  }
});

//create route
router.get("/new", (req, res, next) => {
  try {
    res.render("lists/create");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let result = listSchemaVal.validate(req.body);
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
      req.flash("success", "New Place Added Successfully.");
      res.redirect("/lists");
    }
  } catch (error) {
    next(error);
  }
});

//show route
router.get("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let list = await List.findOne({ _id: id }).populate("reviews");
    if (!list) {
      req.flash("error", "Place not found.");
      res.redirect("/lists");
    } else {
      res.render("lists/show", { list });
    }
  } catch (error) {
    next(error);
  }
});

//update route
router.get("/:id/edit", async (req, res, next) => {
  try {
    let { id } = req.params;
    let list = await List.findById(id);
    if (!list) {
      req.flash("error", "Place not found.");
      res.redirect("/lists");
    } else {
      res.render("lists/edit", { list });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    let result = listSchemaVal.validate(req.body);
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
      req.flash("success", "Place Updated Successfully.");
      res.redirect(`/lists/${id}`);
    }
  } catch (error) {
    next(error);
  }
});

//delete route
router.get("/:id/delete", async (req, res, next) => {
  try {
    let { id } = req.params;
    const list = await List.findByIdAndDelete(id);
    req.flash("success", "Place Deleted Successfully.");
    res.redirect("/lists");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
