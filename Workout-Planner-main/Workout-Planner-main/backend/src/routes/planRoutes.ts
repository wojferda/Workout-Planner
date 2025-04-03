import { Router } from "express";
import { getAllPlans, getPlan, createPlan, updatePlan, deletePlan } from "../controllers/planController";
import { createDay } from "../controllers/dayController";

const router = Router();

// Plan routes
router.get("/", getAllPlans);
router.post("/", createPlan);
router.get("/:id", getPlan);
router.patch("/:id", updatePlan);
router.delete("/:id", deletePlan);

// Nested day route
router.post("/:planId/days", createDay);

export default router; 