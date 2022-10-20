const express = require("express");
const router = express.Router();
const auth = require("../middlware/auth");
const { getAllPlaces, deletePlaceByID, addNewPlace, updatePlace,
    getSinglePlaceByID } = require("../controllers/places");

router.get("places/all", getAllPlaces);

router.get("places/:placeID", getSinglePlaceByID);

router.delete("places/:placeID", auth, deletePlaceByID);

router.post("places/", auth, addNewPlace);

router.patch("places/:placeID", auth, updatePlace);

module.exports = router;