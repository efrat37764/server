import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import indexRoutes from './routes/index.route.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

app.use('/api', indexRoutes);


app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000')
});