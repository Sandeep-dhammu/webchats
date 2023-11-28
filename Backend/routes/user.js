import { Router } from "express";
import { search } from "../controllers/users.js";

const router = Router()

router.get("", search);

export default router