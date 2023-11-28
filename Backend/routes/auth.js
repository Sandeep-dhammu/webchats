import { Router } from "express";
import { forgotPassword, resetPassword, signIn, signUp, verify } from "../controllers/auth.js";

const router = Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/verify",  verify);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
