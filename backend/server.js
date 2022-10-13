require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const placesRoutes = require("./routes/places")
const cors = require("cors");



const PORT = process.env.PORT || 8000;
const auth = require("./middlware/auth");
const { login, register, logout } = require("./controllers/user");


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/places", placesRoutes);


mongoose.connect("mongodb+srv://alexk1923:travel-memories-alexk1923@travel-memories.a8qhq46.mongodb.net/travelMemoriesUsersDB").then(() => {
    app.listen(PORT, () => {
        console.log("Connected to the database and started server on port: " + PORT);
    })
}).catch((err) => {
    console.log(err);
});


app.post("/login", login);
app.post("/register", register);
app.post("/logout", logout);

app.get("/homepage", auth, (req, res) => {
    res.status(200).send("Authenticated !");
})
