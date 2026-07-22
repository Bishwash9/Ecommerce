import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import categoryRoutes from './routes/category.routes.js';

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], //frontend origin 
    credentials: true //allow cookies to be sent from frontend
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

export default app;