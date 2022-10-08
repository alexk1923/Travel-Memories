const Place = require("../models/place");
const mongoose = require("mongoose")

const getAllPlaces = async (req, res) => {
    try {
        const places = await Place.find({});
        return res.status(200).send(places);

    } catch (err) {
        return res.status(500).send(err);
    }
}

const getPlacesByUserID = async (req, res) => {
    Place.find({ addedBy: req.params.userID }, (err, places) => {
        if (err) {
            console.log("Error in finding places added by this user.");
            return res.status(404).send("Finding error");
        }

        return res.status(200).send(places);
    });
}

const deletePlaceByID = async (req, res) => {
    const existingPlace = await Place.findOne({ id: req.params.placeID });

    if (!existingPlace) {
        return res.status(404).send("The place with this id doesn't exists");
    }

    if (req.authUserID.userID !== existingPlace.addedBy) {
        return res.status(401).send("You are not allowed to delete this place");
    }

    existingPlace.remove();
    return res.status(200).send("Place deleted");
}

const addNewPlace = async (req, res) => {
    try {
        const place = await Place.findOne({ name: req.body.name });

        if (place) {
            return res.status(409).send("This places already exists");
        }

        const { name, city, imageURL } = req.body;


        Place.create({
            name,
            city,
            imageURL,
            favorite: 0,
            likes: 0,
            visitors: 1,
            addedBy: req.authUserID.userID
        }, (err, newPlace) => {
            if (err) {
                return res.status(500).send(err);
            }

            return res.status(201).send(newPlace);
        });

    } catch (err) {
        return res.status(500).send(`Error in post new place:${err}`)
    }
}

const updatePlace = async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.placeID)) {
        return res.status(422).send("Place ID has an invalid format");
    }

    const existingPlace = await Place.findById(req.params.placeID);

    if (!existingPlace) {
        return res.status(404).send("Place not found");
    }

    if (req.authUserID.userID !== existingPlace.addedBy) {
        console.log(req.authUserID.userID + "vs." + existingPlace.addedBy);
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
}

const getSinglePlaceByID = async (req, res) => {
    const place = await Place.findById(req.params.placeID);

    if (!mongoose.Types.ObjectId.isValid(req.params.placeID)) {
        return res.status(422).send("Place ID has an invalid format");
    }

    if (!place) {
        return res.status(404).send("Place with this ID doesn't exist");
    }

    return res.status(200).send(place);
}

module.exports = {
    getAllPlaces,
    getPlacesByUserID,
    deletePlaceByID,
    addNewPlace,
    updatePlace,
    getSinglePlaceByID
}