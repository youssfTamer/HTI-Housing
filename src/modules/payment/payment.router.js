import { Router } from 'express';
import { createPayment, reviewPayment } from './payment.controller.js';
import { createPaymentVal, reviewPaymentVal } from './payment.validation.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { isValid } from '../../middleware/validation.js';
import { isAuthenticated } from '../../middleware/authentication.js';
import { isAuthorized } from '../../middleware/authorization.js';
import { roles } from '../../utils/constant/enums.js';


const paymentRouter = Router();

paymentRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
    isValid(createPaymentVal),
    asyncHandler(createPayment)
);

paymentRouter.patch('/:paymentId/review',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
    isValid(reviewPaymentVal),
    asyncHandler(reviewPayment)
);

export default paymentRouter;
