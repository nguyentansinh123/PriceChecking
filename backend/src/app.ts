import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { router as AuthRoute } from './routes/auth.route'
import { connectDB } from './lib/connectDB';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import './controller/tpAuth.controller';

dotenv.config();

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;
connectDB();

app.use('/api/v1/auth', AuthRoute);

app.get("/", (req, res) => {
  res.send(`
    <a href='/api/v1/auth/google'>Login with Google</a><br>
    <a href='/api/v1/auth/facebook'>Login with Facebook</a>
  `);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});