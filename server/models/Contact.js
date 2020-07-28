const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    email: String,
    phone:Number,
});

const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel;