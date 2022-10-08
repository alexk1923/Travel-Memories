const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
            const token = jwt.sign({ userID: existingUser._id, email }, process.env.TOKEN_KEY, {
                expiresIn: "1 day"
            });
            existingUser.token = token;

            return res.status(200).send({ "token": token });
        }

        return res.status(400).send("Wrong credentials");

    } catch (err) {
        console.log(err);
    }
}

const register = async (req, res) => {
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

        res.status(201).json(newUser);

    } catch (err) {

        console.log(err);
        res.send("nu");
    }
}

const logout = async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.send("Error");
    }
}

module.exports = {
    login,
    register,
    logout
}
