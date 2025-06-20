const express = require("express");
const router = express.Router({ mergeParams: true });

//
const multer = require("multer");
const { cloudinary, upload } = require("../cloudConfig.js");
// schema validations middleware
const { validateList } = require("../middlewares/validateList.middleware.js");
// other middlewares
const { isLoggedIn } = require("../middlewares/isLoggedIn.middleware.js");
const { isOwner } = require("../middlewares/isOwner.middleware.js");
// controllers
const {
  allLists,
  renderCreateList,
  createList,
  showList,
  renderEditList,
  editList,
  destroyList,
} = require("../controllers/lists.controller.js");

// index route
router.get("/", allLists);

//create route
router.get("/new", isLoggedIn, renderCreateList);

router.post("/", isLoggedIn, upload.single("image"), validateList, createList);

//show route
router.get("/:id", showList);

//update route
router.get("/:id/edit", isLoggedIn, isOwner, renderEditList);

router.post(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("image"),
  validateList,
  editList
);

//delete route
router.get("/:id/delete", isLoggedIn, isOwner, destroyList);

module.exports = router;
