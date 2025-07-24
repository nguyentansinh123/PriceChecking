import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { router as AuthRoute } from './routes/auth.route'
import { connectDB } from './lib/connectDB';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT || 5000;
connectDB()

app.use('/api/v1/auth', AuthRoute)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});