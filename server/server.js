// shoc71 - 5/oct/2025

// imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import journalRoute from "./routes/journalRoute.js"

// middleware
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

// routes (paths)
app.use("/api/journal", journalRoute);

// server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is live on http://localhost:${PORT}`);
})