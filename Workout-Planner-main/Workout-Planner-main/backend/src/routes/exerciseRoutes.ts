import { Router } from "express";
import { updateExercise, deleteExercise } from "../controllers/exerciseController";

const router = Router();

// Exercise routes (standalone operations)
router.patch("/:id", updateExercise);
router.delete("/:id", deleteExercise);

export default router; 