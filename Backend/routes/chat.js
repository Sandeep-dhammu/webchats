import { Router } from "express";
import { create, getById, remove, search } from "../controllers/chats.js";

const router = Router()

router.post("", create);
router.get("", search);
router.get("/:id", getById);
router.put("/:id", remove);

export default router