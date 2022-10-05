const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    name: String,
    city: String,
    imageURL: String,
    likes: Number,
    favorite: Number,
    visitors: Number,
    addedByUser: String
})

module.exports = mongoose.model("place", placeSchema);