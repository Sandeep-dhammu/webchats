import { Router } from "express";

const router = Router();

router.post("", create);
router.get("", search);
router.put("/:id", remove);


export default router