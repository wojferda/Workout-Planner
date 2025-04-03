import { IsString, IsOptional, Length } from "class-validator";

export class CreatePlanDto {
    @IsString()
    @Length(1, 255)
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdatePlanDto {
    @IsString()
    @Length(1, 255)
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;
} 