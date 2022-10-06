require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const placesRoutes = require("./backend/routes/places")


const PORT = process.env.PORT || 8000;
const auth = require("./backend/middlware/auth");
const { login, register, logout } = require("./backend/controllers/user");


const app = express();
app.use(express.json());
app.use("/api/places", placesRoutes);

mongoose.connect("mongodb://localhost:27017/travelMemoriesUsersDB").then(() => {
    app.listen(PORT, () => {
        console.log("Connected to local database and started server on port: " + PORT);
    })
}).catch((err) => {
    console.log(err);
});


app.get("/login", login);
app.post("/register", register);
app.post("/logout", logout);

app.get("/homepage", auth, (req, res) => {
    res.status(200).send("Authenticated !");
})
