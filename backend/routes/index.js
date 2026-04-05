import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";
import authUser from "../middlewares/authUser.js";

const router = express.Router();


router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/me", authUser, getMe);

export default router;