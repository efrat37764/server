import express from 'express';
import indexRoutes from './routes/index.route.js';

const app = express();

app.use(express.json());

app.use('/api', indexRoutes);


app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000')
});