const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.model.js");
const passport = require("passport");
const { savedRedirectUrl } = require("../middlewares/savedRedirectUrl.js");

// sign-up routes

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
    const currUser = await User.register(newUser, password);
    req.login(currUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to RoomGO.");
      res.redirect("/lists");
    });
  } catch (error) {
    req.flash("error", `${error.message}.`);
    res.redirect("/auth/signup");
  }
});

// login / sign-in routes

router.get("/login", (req, res, next) => {
  try {
    res.render("users/login");
  } catch (error) {
    next(error);
  }
});

router.post(
  "/login",
  savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  async (req, res) => {
    try {
      req.flash("success", "Welcome Back to RoomGO.");
      let redirectUrl = res.locals.redirectUrl || "/lists";
      res.redirect(redirectUrl);
    } catch (error) {
      next(error);
    }
  }
);

// logout routes

router.get("/logout", (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are Logged out successfully.");
      res.redirect("/lists");
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
