import { Router } from 'express';
import { createPayment, reviewPayment } from './payment.controller.js';
import { createPaymentVal, reviewPaymentVal } from './payment.validation.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { isValid } from '../../middleware/validation.js';
import { authenticate, authorize } from '../../middleware/auth.js';

const paymentRouter = Router();

paymentRouter.post('/',
    authenticate,
    isValid(createPaymentVal),
    asyncHandler(createPayment)
);

paymentRouter.patch('/:paymentId/review',
    authenticate,
    authorize('admin'),
    isValid(reviewPaymentVal),
    asyncHandler(reviewPayment)
);

export default paymentRouter;
