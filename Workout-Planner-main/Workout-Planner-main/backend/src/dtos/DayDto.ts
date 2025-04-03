import { IsString, IsOptional, Length } from "class-validator";

export class CreateDayDto {
    @IsString()
    @Length(1, 255)
    name: string;
}

export class UpdateDayDto {
    @IsString()
    @Length(1, 255)
    @IsOptional()
    name?: string;
}

export class ReorderDaysDto {
    @IsString({ each: true })
    dayIds: number[];
} 