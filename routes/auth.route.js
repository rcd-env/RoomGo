const express = require("express");
const router = express.Router({ mergeParams: true });

const passport = require("passport");
// middlewares
const {
  savedRedirectUrl,
} = require("../middlewares/savedRedirectUrl.middleware.js");

// controllers
const {
  renderSignUpUser,
  signUpUser,
  renderLogInUser,
  logInUser,
  logOutUser,
} = require("../controllers/auth.controller.js");

// sign-up routes
router.get("/signup", renderSignUpUser);
router.post("/signup", signUpUser);

// login / sign-in routes
router.get("/login", renderLogInUser);
router.post(
  "/login",
  savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  logInUser
);

// logout routes
router.get("/logout", logOutUser);

module.exports = router;
