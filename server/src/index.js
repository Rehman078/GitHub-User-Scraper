import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConnection.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import githubRoutes from './routes/githubRoutes.js';

// Corrected dotenv configuration
dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/github', githubRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
