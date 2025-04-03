import { Router } from 'express';
import planRoutes from "./planRoutes";
import dayRoutes from "./dayRoutes";
import exerciseRoutes from "./exerciseRoutes";

const router = Router();

// Prefix wszystkich endpointów z /plans
router.use("/plans", planRoutes);

// Prefix dla endpointów związanych z dniami (włącznie z tworzeniem ćwiczeń)
router.use("/days", dayRoutes);

// Prefix dla endpointów związanych z ćwiczeniami (tylko update i delete)
router.use("/exercises", exerciseRoutes);

export default router; 