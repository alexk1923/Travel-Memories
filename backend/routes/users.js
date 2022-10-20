const express = require("express");
const router = express.Router();
const auth = require("../middlware/auth");

const { getPlacesByUser, getUserData } = require("../controllers/user");

router.get("/user/:username", auth, getUserData);
router.get("/user/:username/places", auth, getPlacesByUser);

module.exports = router;