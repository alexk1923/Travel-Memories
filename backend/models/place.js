import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    imageURL: String,
    likes: Number,
    favorite: Number,
    visitors: Number,
    addedBy: { type: String, required: true },
    likedBy: { type: [], required: true },
    ratings: [{ userId: String, rating: Number }]
})

export default mongoose.model("place", placeSchema);