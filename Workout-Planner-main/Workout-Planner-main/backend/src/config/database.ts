import { DataSource } from "typeorm";
import { Plan } from "../entities/Plan";
import { Day } from "../entities/Day";
import { Exercise } from "../entities/Exercise";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "workout_planner",
    synchronize: false,
    logging: process.env.NODE_ENV !== "production",
    entities: [Plan, Day, Exercise],
    subscribers: [],
    migrations: [],
}); 