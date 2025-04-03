import { AppDataSource } from "../config/database";
import { Day } from "../entities/Day";
import { Plan } from "../entities/Plan";

export class DayService {
    private dayRepository = AppDataSource.getRepository(Day);
    private planRepository = AppDataSource.getRepository(Plan);

    async getDaysByPlanId(planId: number): Promise<Day[]> {
        return await this.dayRepository.find({
            where: { plan: { id: planId } },
            relations: ["exercises"],
            order: {
                orderIndex: "ASC",
                exercises: {
                    orderIndex: "ASC"
                }
            }
        });
    }

    async getDayById(id: number): Promise<Day | null> {
        return await this.dayRepository.findOne({
            where: { id },
            relations: ["exercises"],
            order: {
                exercises: {
                    orderIndex: "ASC"
                }
            }
        });
    }

    async createDay(planId: number, dayData: Partial<Day>): Promise<Day> {
        const plan = await this.planRepository.findOneBy({ id: planId });
        if (!plan) {
            throw new Error("Plan not found");
        }

        // Get max orderIndex
        const maxOrderDay = await this.dayRepository.findOne({
            where: { plan: { id: planId } },
            order: { orderIndex: "DESC" }
        });

        const day = this.dayRepository.create({
            ...dayData,
            plan,
            orderIndex: maxOrderDay ? maxOrderDay.orderIndex + 1 : 0
        });

        return await this.dayRepository.save(day);
    }

    async updateDay(id: number, dayData: Partial<Day>): Promise<Day | null> {
        await this.dayRepository.update(id, dayData);
        return await this.getDayById(id);
    }

    async deleteDay(id: number): Promise<void> {
        await this.dayRepository.delete(id);
    }

    async reorderDays(planId: number, dayIds: number[]): Promise<void> {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            for (let i = 0; i < dayIds.length; i++) {
                await queryRunner.manager.update(Day, dayIds[i], { orderIndex: i });
            }
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
} 