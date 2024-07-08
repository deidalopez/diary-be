import express from "express";
import { signUpUser, logInUser } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", logInUser);

export default router;
