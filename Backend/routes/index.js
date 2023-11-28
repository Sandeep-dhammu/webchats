import { Router } from "express";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import chatRouter from "./chat.js";
import { ValidateToken } from "../middlewares/authentication.js";

const router = Router();

router.use('/auths', authRouter);
router.use('/users', ValidateToken, userRouter);
router.use('/chats', ValidateToken, chatRouter);
// router.use('/users', )

export default router