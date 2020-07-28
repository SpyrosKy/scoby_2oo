const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const session = require("express-session");

// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });
router.patch("/me", (req, res, next) => {
  UserModel
    .findByIdAndUpdate(session.currentUser._id, req.body)
    .then((updateUser) => {
    res.status(200).json(updateUser)
    })
    .catch((err) => {
    res.sendStatus(500)
  })
} )

module.exports = router;
