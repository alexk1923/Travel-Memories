import User from "../models/user.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
            const token = jwt.sign({ userID: existingUser._id, email }, process.env.TOKEN_KEY, {
                expiresIn: "1 day"
            });
            existingUser.token = token;

            return res.status(200).send({ "email": existingUser.email, "username": existingUser.username, "token": token });
        }

        return res.status(400).json("Wrong credentials. Please try again");

    } catch (err) {
        console.log(err);
    }
}

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(409).send("There is already an account using this email address.");
        }

        encryptedPass = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: encryptedPass,
            profilePhoto: "img/defaultUser.png"
        });

        res.status(201).json(newUser);

    } catch (err) {

        console.log(err);
        res.status(400).send(err);
    }
}

const logout = async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.send("Error");
    }
}

const getUserData = async (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
        if (err) {
            console.log("Error in finding a user that has this username");
            return res.status(404).json({ err: "Finding error" });
        }

        // console.log("user:");
        return res.status(200).send({ id: user.id, username: user.username, profilePhoto: user.profilePhoto });
    });
}

export {
    login,
    register,
    logout,
    getUserData
}



