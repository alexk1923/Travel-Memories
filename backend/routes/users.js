import { getUserData } from "../controllers/user.js";
import { auth } from "../middlware/auth.js"
import express from "express"

const router = express.Router();

router.get("/user/:username", auth, getUserData);

export default router;