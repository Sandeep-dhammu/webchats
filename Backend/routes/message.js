import { Router } from "express";
import { search } from "../controllers/messages.js";

const router = Router();

router.get("", search);

export default router