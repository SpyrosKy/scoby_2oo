const express = require("express");
const router = express.Router();
const ItemModel = require("../models/Item");

// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

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
      console.log("Liste of :", item);
      res.status(200).json(item);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

router.post("/", (req, res, next) => {
  ItemModel.create(req.body)
    .then((newItem) => {
      console.log("new item succes");
      res.status(201).json(newItem);
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
