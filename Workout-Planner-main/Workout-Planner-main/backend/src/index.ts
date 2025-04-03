import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/database";
import routes from "./routes";
import morgan from "morgan";

const app = express();

// Dodaj middleware do logowania requestów
app.use(morgan('dev'));

// CORS
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// API routes
app.use("/api", routes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Error:", err);
    res.status(500).json({ 
        message: "Something went wrong!", 
        error: err instanceof Error ? err.message : String(err)
    });
});

const PORT = Number(process.env.PORT) || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connection established");
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("TypeORM connection error:", error);
        process.exit(1);
    }); 