require("dotenv").config();

const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {

    console.log("req headers: ");
    console.log(req.headers);
    const token = req.headers["authorization"].split(" ")[1];

    if (!token) {
        return res.status(403).json({ err: "Token required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        console.log("decoded: ");
        console.log(decoded);
        req.authUserID = decoded;
    } catch (err) {
        return res.status(401).send("Invalid token");
    }

    return next();
}

module.exports = checkToken;

