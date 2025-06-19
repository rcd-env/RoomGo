const List = require("../models/list.model.js");

module.exports.allLists = async (req, res, next) => {
  try {
    let lists = await List.find({});
    res.render("lists/index.ejs", { lists });
  } catch (error) {
    next(error);
  }
};

module.exports.renderCreateList = (req, res, next) => {
  try {
    return res.render("lists/create");
  } catch (error) {
    next(error);
  }
};

module.exports.createList = async (req, res, next) => {
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
};

module.exports.showList = async (req, res, next) => {
  try {
    let { id } = req.params;
    let list = await List.findOne({ _id: id })
      .populate({ path: "reviews", populate: { path: "author" } })
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
};

module.exports.renderEditList = async (req, res, next) => {
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
};

module.exports.editList = async (req, res, next) => {
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
};

module.exports.destroyList = async (req, res, next) => {
  try {
    let { id } = req.params;
    const list = await List.findByIdAndDelete(id);
    req.flash("success", "Place Deleted Successfully.");
    res.redirect("/lists");
  } catch (error) {
    next(error);
  }
};
