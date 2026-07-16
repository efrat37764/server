import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from "helmet";
import rateLimit from 'express-rate-limit';
import indexRoutes from './routes/index.route.js';
import { addRequestDate } from './middlewares/index.middleware.js';
import { notFound, errorHandler } from './middlewares/errors.middleware.js';

const app = express();

// הוספת כותרות אבטחה להגנה מפני פגיעויות נפוצות ברשת
app.use(helmet());

app.use(cors());

app.use(morgan('dev'));

// (ההגבלה כאן: 100 בקשות לכל 15 דקות) הגבלת כמות הבקשות מכתובת בודדת כדי למנוע עומס חריג על השרת
app.use(rateLimit({windowMs: 15 * 60 * 1000, max: 100, message: 'Too many requests from this IP, please try again after 15 minutes',}));

app.use(express.json());

app.use(addRequestDate);

app.use('/api', indexRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000')
});