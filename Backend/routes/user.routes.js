import express from "express";
import { signUp, loginUser,logoutUser,userDetails, Getcookie } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup",signUp);
router.post("/login", loginUser);
router.post("/logout",verifyJWT,logoutUser)
router.get("/user-details",verifyJWT,userDetails)
router.get("/check-cookie",Getcookie)

export default router;