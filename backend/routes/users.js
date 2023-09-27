import { getUserData, updateUser } from "../controllers/user.js";
import { auth } from "../middlware/auth.js"
import express from "express"

const router = express.Router();

router.get("/user/:username", auth, getUserData);
router.patch("/user/:userId", auth, updateUser);

export default router;