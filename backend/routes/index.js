import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";
import { createApplication ,
    getApplications,
    getApplicationById,
    updateApplication,
    deleteApplication
} 
from "../controllers/applicationController.js";
import authUser from "../middlewares/authUser.js";

const router = express.Router();


router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/me", authUser, getMe);


router.post("/applications", authUser, createApplication);

router.get("/applications", authUser, getApplications);

router.get("/applications/:id", authUser, getApplicationById);

router.put("/applications/:id", authUser, updateApplication);

router.delete("/applications/:id", authUser, deleteApplication);

export default router;