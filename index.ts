import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { userRoutes } from './src/routes/user-routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware of Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware of Cookie Parser
app.use(cookieParser());

app.use('/api/user', userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})