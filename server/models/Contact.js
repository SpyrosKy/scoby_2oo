const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  contact: { type: String, enum: ["phone", "email"] },
});

const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel;
