require("dotenv").config();

const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
    console.log(req.headers);
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("Token required");
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

