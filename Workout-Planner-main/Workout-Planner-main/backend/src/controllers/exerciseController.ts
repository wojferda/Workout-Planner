import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Exercise } from "../entities/Exercise";
import { Day } from "../entities/Day";

const exerciseRepository = AppDataSource.getRepository(Exercise);
const dayRepository = AppDataSource.getRepository(Day);

export const createExercise = async (req: Request, res: Response) => {
    try {
        const dayId = Number(req.params.dayId);
        const day = await dayRepository.findOneBy({ id: dayId });
        
        if (!day) {
            return res.status(404).json({ message: "Day not found" });
        }

        const exercise = exerciseRepository.create({
            ...req.body,
            day: day
        });

        const result = await exerciseRepository.save(exercise);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating exercise:", error);
        res.status(500).json({
            message: "Error creating exercise",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

export const updateExercise = async (req: Request, res: Response) => {
    try {
        const exercise = await exerciseRepository.findOneBy({ id: Number(req.params.id) });
        
        if (!exercise) {
            return res.status(404).json({ message: "Exercise not found" });
        }

        exerciseRepository.merge(exercise, req.body);
        const result = await exerciseRepository.save(exercise);
        res.json(result);
    } catch (error) {
        console.error("Error updating exercise:", error);
        res.status(500).json({
            message: "Error updating exercise",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

export const deleteExercise = async (req: Request, res: Response) => {
    try {
        const result = await exerciseRepository.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Exercise not found" });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting exercise:", error);
        res.status(500).json({
            message: "Error deleting exercise",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}; 