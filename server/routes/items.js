const express = require("express");
const router = express.Router();
const ItemModel = require("../models/Item");
const fileUpload = require("../config/cloudinary");

// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.post("/", fileUpload.single("image"), (req, res, next) => {
  //console.log("in backend for item creation ", req.body);
  var item;

  if (req.file) {
    item = { ...req.body };
    item.image = req.file.path;
    item.id_user = req.session.currentUser._id;
  } else if (!req.file) {
    item = { ...req.body };
    item.id_user = req.session.currentUser._id;
  }

  console.log("in backend - new item to create ", item);

  ItemModel.create(item)
    .then((newItem) => {
      console.log("new item success -> ", newItem);
      res.status(201).json(newItem);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

router.get("/", function (req, res, next) {
  ItemModel.find()
    .then((items) => {
      console.log("Liste of :", items);
      res.status(200).json(items);
    })
    .catch((err) => {
      console.log("error items", err);
      res.sendStatus(500);
    });
});

router.get("/:id", function (req, res, next) {
  ItemModel.findById(req.params.id)
    .then((item) => {
      console.log("1 item found :", item);
      res.status(200).json(item);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

router.patch("/:id", function (req, res, next) {
  ItemModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((item) => {
      console.log("Update of :", item);
      res.status(200).json(item);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

router.delete("/:id", function (req, res, next) {
  ItemModel.findByIdAndDelete(req.params.id)
    .then((item) => {
      console.log("Deleted :", item);
      res.sendStatus(202);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = router;
