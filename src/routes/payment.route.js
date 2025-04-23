import { Router } from 'express';
import { confirmPaymentController, getPaymentTypeController, updatePaymentController } from '../controllers/payment/payment.js';

export const paymentRouter = Router();

paymentRouter.patch('/', updatePaymentController);
paymentRouter.get('/types', getPaymentTypeController);
paymentRouter.get('/confirmPayment', confirmPaymentController);
