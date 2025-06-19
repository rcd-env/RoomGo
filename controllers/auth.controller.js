const User = require("../models/user.model.js");

module.exports.renderSignUpUser = (req, res, next) => {
  try {
    res.render("users/signup");
  } catch (error) {
    next(error);
  }
};

module.exports.signUpUser = async (req, res, next) => {
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
};

module.exports.renderLogInUser = (req, res, next) => {
  try {
    res.render("users/login");
  } catch (error) {
    next(error);
  }
};

module.exports.logInUser = async (req, res) => {
  try {
    req.flash("success", "Welcome Back to RoomGO.");
    let redirectUrl = res.locals.redirectUrl || "/lists";
    res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

module.exports.logOutUser = (req, res, next) => {
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
};
