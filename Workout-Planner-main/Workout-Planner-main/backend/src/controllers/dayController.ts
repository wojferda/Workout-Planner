import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Day } from "../entities/Day";
import { Plan } from "../entities/Plan";

const dayRepository = AppDataSource.getRepository(Day);
const planRepository = AppDataSource.getRepository(Plan);

export const createDay = async (req: Request, res: Response) => {
    try {
        const planId = Number(req.params.planId);
        const plan = await planRepository.findOneBy({ id: planId });
        
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        const day = dayRepository.create({
            ...req.body,
            plan: plan
        });

        const result = await dayRepository.save(day);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating day:", error);
        res.status(500).json({
            message: "Error creating day",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

export const updateDay = async (req: Request, res: Response) => {
    try {
        const day = await dayRepository.findOne({
            where: { id: Number(req.params.id) },
            relations: { exercises: true }
        });

        if (!day) {
            return res.status(404).json({ message: "Day not found" });
        }

        dayRepository.merge(day, req.body);
        const result = await dayRepository.save(day);
        res.json(result);
    } catch (error) {
        console.error("Error updating day:", error);
        res.status(500).json({
            message: "Error updating day",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

export const deleteDay = async (req: Request, res: Response) => {
    try {
        const result = await dayRepository.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Day not found" });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting day:", error);
        res.status(500).json({
            message: "Error deleting day",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}; 