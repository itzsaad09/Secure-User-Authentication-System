import express from "express";
import {register, verify, resendVerificationCode, login, recoverPassword, getUser, googleAuth} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verify);
router.post("/resend", resendVerificationCode);
router.post("/login", login);
router.post("/recover", recoverPassword);
router.get("/display", getUser);
router.post("/google", googleAuth);

export default router;