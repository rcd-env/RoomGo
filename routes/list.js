const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middlewares/isLoggedIn.js");
//models
const List = require("../models/list.model.js");

// schema validationsß
const { validateList } = require("../middlewares/validateList.js");

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
router.get("/new", isLoggedIn, (req, res, next) => {
  try {
    return res.render("lists/create");
  } catch (error) {
    next(error);
  }
});

router.post("/", isLoggedIn, validateList, async (req, res, next) => {
  try {
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
      owner: req.user._id,
    });
    req.flash("success", "New Place Added Successfully.");
    res.redirect("/lists");
  } catch (error) {
    next(error);
  }
});

//show route
router.get("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let list = await List.findOne({ _id: id })
      .populate("reviews")
      .populate("owner");
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
router.get("/:id/edit", isLoggedIn, async (req, res, next) => {
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

router.post("/:id", isLoggedIn, validateList, async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

//delete route
router.get("/:id/delete", isLoggedIn, async (req, res, next) => {
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
