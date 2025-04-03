import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public details?: any
    ) {
        super(message);
        this.name = "AppError";
    }
}

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            details: err.details
        });
    }

    // Handle TypeORM errors
    if (err.name === "QueryFailedError") {
        return res.status(400).json({
            message: "Database operation failed",
            error: err.message
        });
    }

    // Handle validation errors
    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation failed",
            error: err.message
        });
    }

    // Default error
    res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
}; 