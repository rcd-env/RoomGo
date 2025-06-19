module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash(
      "error",
      "You must Sign Up/log In first to do some specific task."
    );
    return res.redirect("/auth/login");
  }
  next();
};
