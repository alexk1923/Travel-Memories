const express = require("express");
const router = express.Router();
const auth = require("../middlware/auth");
const { getAllPlaces, getPlacesByUserID, deletePlaceByID, addNewPlace, updatePlace,
    getSinglePlaceByID } = require("../controllers/places");


router.get("/all", getAllPlaces);

router.get("/user/:userID", getPlacesByUserID);

router.get("/:placeID", getSinglePlaceByID);

router.delete("/:placeID", auth, deletePlaceByID);

router.post("/", auth, addNewPlace);

router.patch("/:placeID", auth, updatePlace);

module.exports = router;