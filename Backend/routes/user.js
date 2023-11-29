import { Router } from "express";
import { search, update } from "../controllers/users.js";

const router = Router()

router.get("", search);
router.put("", update);

export default router