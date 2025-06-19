const List = require("../models/list.model.js");

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let list = await List.findById(id);
  if (req.user && !req.user._id.equals(list.owner._id)) {
    req.flash("error", "You are not the owner.");
    return res.redirect(`/lists/${id}`);
  }
  next();
};
