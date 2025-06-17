const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.model.js");
const passport = require("passport");

router.get("/signup", (req, res, next) => {
  try {
    res.render("users/signup");
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    let { email, username, password } = req.body;
    let newUser = new User({
      email,
      username,
    });
    await User.register(newUser, password);
    req.flash("success", "Welcome to RoomGO.");
    res.redirect("/lists");
  } catch (error) {
    req.flash("error", `${error.message}.`);
    res.redirect("/auth/signup");
  }
});

router.get("/login", (req, res, next) => {
  try {
    res.render("users/login");
  } catch (error) {
    next(error);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  async (req, res) => {
    try {
      req.flash("success", "Welcome Back to RoomGO.");
      res.redirect("/lists");
    } catch (error) {
      res.redirect("/auth/login");
    }
  }
);

module.exports = router;
