import { Router } from 'express';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { isAuthenticated } from '../../middleware/authentication.js';
import { isAuthorized } from '../../middleware/authorization.js';
import { isValid } from '../../middleware/validation.js';
import { roles } from '../../utils/constant/enums.js';
import { cloudUploads } from '../../utils/multer-cloud.js';
import { createPayment, reviewPayment } from './payment.controller.js';
import { createPaymentVal, reviewPaymentVal } from './payment.validation.js';


const paymentRouter = Router();

paymentRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER, roles.STAFF, roles.STUDENT]),
    cloudUploads().single('receiptImage'),
    isValid(createPaymentVal),
    asyncHandler(createPayment)
);

paymentRouter.patch('/:paymentId/review',
    isAuthenticated(),
    isAuthorized([roles.MANAGER, roles.STAFF, roles.STUDENT]),
    isValid(reviewPaymentVal),
    asyncHandler(reviewPayment)
);

export default paymentRouter;
