const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();
const Place = require("../models/place");
const auth = require("../middlware/auth");

router.get("/all", async (req, res) => {
    try {
        const places = await Place.find({});
        return res.status(200).send(places);

    } catch (err) {
        return res.status(500).send(err);
    }
})

router.get("/user/:userID", async (req, res) => {
    Place.find({ addedBy: req.params.userID }, (err, places) => {
        if (err) {
            console.log("Error in finding places added by this user.");
            return res.status(404).send("Finding error");
        }

        return res.status(200).send(places);
    });
})

router.delete("/:placeID", auth, async (req, res) => {
    const existingPlace = await Place.findOne({ id: req.params.placeID });

    if (!existingPlace) {
        return res.status(404).send("The place with this id doesn't exists");
    }

    if (req.authUserID.user_id !== existingPlace.addedBy) {
        return res.status(401).send("You are not allowed to delete this place");
    }

    existingPlace.remove();
    return res.status(200).send("Place deleted");
})

router.post("/", auth, async (req, res) => {
    try {
        const place = await Place.findOne({ name: req.body.name });

        if (place) {
            return res.status(409).send("This places already exists");
        }

        const { name, city, imageURL, userID } = req.body;

        Place.create({
            name,
            city,
            imageURL,
            favorite: 0,
            likes: 0,
            visitors: 1,
            addedBy: userID
        }, (err, newPlace) => {
            if (err) {
                return res.status(500).send(err);
            }

            return res.status(201).send(newPlace);
        });

    } catch (err) {
        return res.status(500).send(`Error in post new place:${err}`)
    }
})

router.patch("/:placeID", auth, async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.placeID)) {
        return res.status(422).send("Place ID has an invalid format");
    }

    const existingPlace = await Place.findById(req.params.placeID);

    // console.log(req.params.placeID);
    // console.log(existingPlace.id);

    if (!existingPlace) {
        return res.status(404).send("Place not found");
    }

    if (req.authUserID.user_id !== existingPlace.addedBy) {
        console.log(req.authUserID.user_id + "vs." + existingPlace.addedBy);
        return res.status(401).send("You are not allowed to edit this place");
    }

    for (let key of Object.keys(req.body)) {
        const JSONPlace = JSON.parse(JSON.stringify(existingPlace));
        if (JSONPlace.hasOwnProperty(key)) {
            existingPlace[key] = req.body[key];
        }
    }

    existingPlace.save((err, modifiedPlace) => {
        if (err) {
            return res.status(409).send("Updating resource error");
        }
        return res.status(200).send(modifiedPlace);
    })
})

module.exports = router;