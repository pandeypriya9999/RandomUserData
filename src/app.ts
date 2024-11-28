// src/app.ts

import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
app.use('/api', userRoutes);

export default app;
