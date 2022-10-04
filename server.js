require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./backend/models/user");
const PORT = process.env.PORT || 8000;
const auth = require("./backend/middlware/auth");


const app = express();
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/travelMemoriesUsersDB").then(() => {
    app.listen(PORT, () => {
        console.log("Connected to local database and started server on port: " + PORT);
    })
}).catch((err) => {
    console.log(err);
});


app.get("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
            const token = jwt.sign({ user_id: existingUser._id, email }, process.env.TOKEN_KEY, {
                expiresIn: "1h"
            });
            existingUser.token = token;

            res.status(200).json({ "auth_token": token });
        }

        res.status(400).send("Wrong credentials");

    } catch (err) {
        console.log(err);
    }
})


app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).send("There is already an account using this email address.");
        }

        encryptedPass = await bcrypt.hash(password, 10);

        console.log("Tot am trecut de existing user");

        const newUser = await User.create({
            username,
            email,
            password: encryptedPass
        });

        const token = jwt.sign({ user_id: newUser._id, email }, process.env.TOKEN_KEY, { expiresIn: "1h" });

        // save new user token
        newUser.token = token;
        res.status(201).json(newUser);

    } catch (err) {

        console.log(err);
        res.send("nu");
    }

})

app.get("/homepage", auth, (req, res) => {
    res.status(200).send("Authenticated !");
})
