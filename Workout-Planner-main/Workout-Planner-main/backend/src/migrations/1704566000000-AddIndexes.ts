import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexes1704566000000 implements MigrationInterface {
    name = 'AddIndexes1704566000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_plan_name" ON "plans" ("name")`);
        await queryRunner.query(`CREATE INDEX "IDX_plan_created" ON "plans" ("createdAt")`);
        await queryRunner.query(`CREATE INDEX "IDX_day_order" ON "days" ("orderIndex")`);
        await queryRunner.query(`CREATE INDEX "IDX_exercise_order" ON "exercises" ("orderIndex")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_exercise_order"`);
        await queryRunner.query(`DROP INDEX "IDX_day_order"`);
        await queryRunner.query(`DROP INDEX "IDX_plan_created"`);
        await queryRunner.query(`DROP INDEX "IDX_plan_name"`);
    }
} 