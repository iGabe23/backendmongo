import { Router } from "express";
import Controller from "../controllers/controller.js";

const router = Router();

router.post("/", Controller.create);
router.get("/", Controller.readAll);
router.get("/:id", Controller.read);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);

export default router;
