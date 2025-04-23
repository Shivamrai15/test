import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { employeeRouter } from './routes/employee.route.js';
import { eventRouter } from './routes/event.route.js';
import { paymentRouter } from './routes/payment.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/v1/employee/', employeeRouter);
app.use('/api/v1/event/', eventRouter);
app.use('/api/v1/payment/', paymentRouter);

app.get('/', (req, res) => {
  return res.send('Insure Infinite API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
