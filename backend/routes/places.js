const express = require("express");
const router = express.Router();
const Place = require("../models/place");
const auth = require("../middlware/auth");

router.get("/all", (req, res) => {
    try {
        const places = Place.find({});
        console.log(places);
        return res.status(200).send(places);
    } catch (err) {
        console.log(err);
    }
})

router.post("/", auth, (req, res) => {
    try {
        const place = Place.findOne({ name: req.body.name });
        if (!place) {
            // console.log("This places already exists");
            return res.status(409).send("This places already exists");
        }

        const { name, city, imageURL } = req.body;
        const newPlace = Place.create({
            name,
            city,
            imageURL,
            favorite: 0,
            likes: 0,
            visitors: 1
        }, (err) => {
            console.log(`Error creating new place: ${err} `);
        });
        return res.status(201).send(newPlace);

    } catch (err) {
        console.log(`Error in post new place:${err}`);
    }
})

router.patch("/", auth, (req, res) => {
    try {
        const { id } = req.body;
        Place.findById(id, (err, existingPlace) => {
            if (err) {
                console.log(err);
                return res.status(409).send("Eroare inca nedefinita");
            }
            console.log(req.query);
        })

        // const existingName = Place.findOne({ name: req.body.name });
        // if (!existingName) {
        //     return res.status(404).send("This place doesn't exist");
        // }



    } catch (err) {
        console.log(`Error in post new place:${err}`);
    }
})

module.exports = router;