module.exports.isLoggedIn = (req, res, next) => {
  console.log(req);

  if (!req.isAuthenticated()) {
    req.flash(
      "error",
      "You must login/sign-up first to create a vacation spot."
    );
    return res.redirect("/auth/login");
  }
  next();
};
