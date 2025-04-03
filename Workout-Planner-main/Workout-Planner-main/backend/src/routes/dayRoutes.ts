import { Router } from "express";
import { updateDay, deleteDay } from "../controllers/dayController";
import { createExercise } from "../controllers/exerciseController";

const router = Router();

// Day routes
router.patch("/:id", updateDay);
router.delete("/:id", deleteDay);

// Exercise routes (nested under days)
router.post("/:dayId/exercises", createExercise);

export default router; 