import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'; 
import stationRoutes from './routes/stationRoutes.js';

// 1. Initialize dotenv FIRST
dotenv.config();

const app = express();

// 2. Global Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); 

app.use(cookieParser());

// 3. Mount Routes
app.use("/api/users", userRoutes);
app.use('/api/stations', stationRoutes);

// 4. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Hinga Database Connected"))
  .catch(err => console.error("Database Connection Error:", err));

// 5. Start Server
const PORT = process.env.PORT || 8080; // Use 8080 if 5000 gives you 403
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));