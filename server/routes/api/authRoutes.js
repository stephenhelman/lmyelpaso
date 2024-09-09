import express from "express";
export const router = express.Router();
import { login, refresh, logout } from "../../controllers/authController.js";
import { loginLimiter } from "../../middleware/loginLimiter.js";

router.route("/login").post(loginLimiter, login);

router.route("/refresh").get(refresh);

router.route("/logout").post(logout);
