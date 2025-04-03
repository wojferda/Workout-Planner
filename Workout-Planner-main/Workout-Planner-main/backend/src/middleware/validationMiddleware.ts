import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

export const validateDto = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObject = plainToInstance(dtoClass, req.body);
        const errors = await validate(dtoObject);

        if (errors.length > 0) {
            const formattedErrors = formatValidationErrors(errors);
            res.status(400).json({
                message: "Validation failed",
                errors: formattedErrors
            });
            return;
        }

        req.body = dtoObject;
        next();
    };
};

const formatValidationErrors = (errors: ValidationError[]) => {
    return errors.reduce((acc: { [key: string]: string[] }, error) => {
        acc[error.property] = Object.values(error.constraints || {});
        return acc;
    }, {});
}; 