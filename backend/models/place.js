const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    imageURL: String,
    likes: Number,
    favorite: Number,
    visitors: Number,
    addedBy: { type: String, required: true },
    likedBy: { type: [], required: true }
})

module.exports = mongoose.model("place", placeSchema);