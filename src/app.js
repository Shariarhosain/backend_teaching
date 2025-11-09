import express from 'express';
import path from 'path';


import userRoute from './Routes/userRoute.js';
import paymentRoute from './Routes/paymentRoute.js';

import cors from 'cors';


const app = express();

//enable cors to all
app.use(cors());

app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/user', userRoute);
app.use('/api/payment', paymentRoute);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});