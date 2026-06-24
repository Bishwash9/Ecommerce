import express from 'express';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API');
});

app.use('/api/users', userRoutes);

export default app;