const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const contactModel = require("../models/Contact")
const session = require("express-session");

// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });
router.patch("/me", (req, res, next) => {
  var currentUserId = req.session.currentUser._id;
  console.log("current user id is ", currentUserId);
  UserModel
    .findByIdAndUpdate(currentUserId, req.body)
    .then((updateUser) => {
    res.status(200).json(updateUser)
    })
    .catch((err) => {
    res.sendStatus(500)
  })
} )

module.exports = router;
