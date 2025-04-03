import { AppDataSource } from "../config/database";
import { Exercise } from "../entities/Exercise";
import { Day } from "../entities/Day";

export class ExerciseService {
    private exerciseRepository = AppDataSource.getRepository(Exercise);
    private dayRepository = AppDataSource.getRepository(Day);

    async getExercisesByDayId(dayId: number): Promise<Exercise[]> {
        return await this.exerciseRepository.find({
            where: { day: { id: dayId } },
            order: { orderIndex: "ASC" }
        });
    }

    async getExerciseById(id: number): Promise<Exercise | null> {
        return await this.exerciseRepository.findOne({
            where: { id }
        });
    }

    async createExercise(dayId: number, exerciseData: Partial<Exercise>): Promise<Exercise> {
        const day = await this.dayRepository.findOneBy({ id: dayId });
        if (!day) {
            throw new Error("Day not found");
        }

        // Get max orderIndex
        const maxOrderExercise = await this.exerciseRepository.findOne({
            where: { day: { id: dayId } },
            order: { orderIndex: "DESC" }
        });

        const exercise = this.exerciseRepository.create({
            ...exerciseData,
            day,
            orderIndex: maxOrderExercise ? maxOrderExercise.orderIndex + 1 : 0
        });

        return await this.exerciseRepository.save(exercise);
    }

    async updateExercise(id: number, exerciseData: Partial<Exercise>): Promise<Exercise | null> {
        await this.exerciseRepository.update(id, exerciseData);
        return await this.getExerciseById(id);
    }

    async deleteExercise(id: number): Promise<void> {
        await this.exerciseRepository.delete(id);
    }

    async reorderExercises(dayId: number, exerciseIds: number[]): Promise<void> {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            for (let i = 0; i < exerciseIds.length; i++) {
                await queryRunner.manager.update(Exercise, exerciseIds[i], { orderIndex: i });
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