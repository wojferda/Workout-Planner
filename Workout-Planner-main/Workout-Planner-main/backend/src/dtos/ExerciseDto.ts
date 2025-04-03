import { IsString, IsNumber, IsOptional, Length, Min, Max } from "class-validator";

export class CreateExerciseDto {
    @IsString()
    @Length(1, 255)
    name: string;

    @IsNumber()
    @Min(1)
    @Max(100)
    sets: number;

    @IsNumber()
    @Min(1)
    @Max(1000)
    repetitions: number;

    @IsString()
    @IsOptional()
    notes?: string;
}

export class UpdateExerciseDto {
    @IsString()
    @Length(1, 255)
    @IsOptional()
    name?: string;

    @IsNumber()
    @Min(1)
    @Max(100)
    @IsOptional()
    sets?: number;

    @IsNumber()
    @Min(1)
    @Max(1000)
    @IsOptional()
    repetitions?: number;

    @IsString()
    @IsOptional()
    notes?: string;
}

export class ReorderExercisesDto {
    @IsNumber({}, { each: true })
    exerciseIds: number[];
} 