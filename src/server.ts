// src/server.ts

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import config from './config/config';
import connectDB from './config/db';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', userRoutes);

// Start the server
const startServer = async () => {
  await connectDB();

  app.listen(4000, () => {
    console.log(`Server running on port 4000`);
  });
};

startServer();
