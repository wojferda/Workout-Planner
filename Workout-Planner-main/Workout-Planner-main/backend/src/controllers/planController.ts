import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Plan } from "../entities/Plan";

const planRepository = AppDataSource.getRepository(Plan);

export const getAllPlans = async (req: Request, res: Response) => {
    try {
        const plans = await planRepository.find({
            relations: {
                days: {
                    exercises: true
                }
            },
            order: {
                createdAt: "DESC",
                days: {
                    orderIndex: "ASC",
                    exercises: {
                        orderIndex: "ASC"
                    }
                }
            }
        });
        res.json(plans);
    } catch (error) {
        console.error("Error fetching plans:", error);
        res.status(500).json({ 
            message: "Error fetching plans",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

export const getPlan = async (req: Request, res: Response) => {
    try {
        const plan = await planRepository.findOne({
            where: { id: Number(req.params.id) },
            relations: {
                days: {
                    exercises: true
                }
            }
        });
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }
        res.json(plan);
    } catch (error) {
        console.error("Error fetching plan:", error);
        res.status(500).json({ 
            message: "Error fetching plan",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

export const createPlan = async (req: Request, res: Response) => {
    try {
        const plan = planRepository.create(req.body);
        const result = await planRepository.save(plan);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating plan:", error);
        res.status(500).json({ 
            message: "Error creating plan",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

export const updatePlan = async (req: Request, res: Response) => {
    try {
        const plan = await planRepository.findOneBy({ id: Number(req.params.id) });
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }
        planRepository.merge(plan, req.body);
        const result = await planRepository.save(plan);
        res.json(result);
    } catch (error) {
        console.error("Error updating plan:", error);
        res.status(500).json({ 
            message: "Error updating plan",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

export const deletePlan = async (req: Request, res: Response) => {
    try {
        const result = await planRepository.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Plan not found" });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting plan:", error);
        res.status(500).json({ 
            message: "Error deleting plan",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

// ... inne metody kontrolera 