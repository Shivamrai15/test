import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { employeeRouter } from './routes/employee.route.js';
import { eventRouter } from './routes/event.route.js';
import { paymentRouter } from './routes/payment.route.js';
import { clerkMiddleware } from '@clerk/express';
import { authZMiddleware } from './middlewares/authZ.middleware.js';
import { authNMiddleware } from './middlewares/authN.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
);

app.use(cookieParser());
app.use(clerkMiddleware());

app.use('/api/v1/employee/', authNMiddleware, authZMiddleware, employeeRouter);
app.use('/api/v1/event/', authNMiddleware, authZMiddleware, eventRouter);
app.use('/api/v1/payment/',authNMiddleware, authZMiddleware, paymentRouter);

app.get('/',authNMiddleware, authZMiddleware, (req, res) => {
  return res.send('Insure Infinite API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
