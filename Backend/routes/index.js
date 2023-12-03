import { Router } from "express";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import chatRouter from "./chat.js";
import messageRouter from "./message.js";
import { ValidateToken } from "../middlewares/authentication.js";

const router = Router();

router.use('/auths', authRouter);
router.use('/users', ValidateToken, userRouter);
router.use('/chats', ValidateToken, chatRouter);
router.use('/messages', ValidateToken, messageRouter);
// router.use('/users', )

export default router