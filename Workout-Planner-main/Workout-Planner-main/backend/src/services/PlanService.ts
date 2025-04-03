import { AppDataSource } from "../config/database";
import { Plan } from "../entities/Plan";
import { Day } from "../entities/Day";
import { Exercise } from "../entities/Exercise";

export class PlanService {
    private planRepository = AppDataSource.getRepository(Plan);
    private dayRepository = AppDataSource.getRepository(Day);
    private exerciseRepository = AppDataSource.getRepository(Exercise);

    async getAllPlans(): Promise<Plan[]> {
        return await this.planRepository.find({
            relations: ["days", "days.exercises"],
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
    }

    async getPlanById(id: number): Promise<Plan | null> {
        return await this.planRepository.findOne({
            where: { id },
            relations: ["days", "days.exercises"],
            order: {
                days: {
                    orderIndex: "ASC",
                    exercises: {
                        orderIndex: "ASC"
                    }
                }
            }
        });
    }

    async createPlan(planData: Partial<Plan>): Promise<Plan> {
        const plan = this.planRepository.create(planData);
        return await this.planRepository.save(plan);
    }

    async updatePlan(id: number, planData: Partial<Plan>): Promise<Plan | null> {
        await this.planRepository.update(id, planData);
        return await this.getPlanById(id);
    }

    async deletePlan(id: number): Promise<void> {
        await this.planRepository.delete(id);
    }
} 