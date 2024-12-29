import { Router } from 'express';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { isAuthenticated } from '../../middleware/authentication.js';
import { isAuthorized } from '../../middleware/authorization.js';
import { isValid } from '../../middleware/validation.js';
import { roles } from '../../utils/constant/enums.js';
import { cloudUploads } from '../../utils/multer-cloud.js';
import { createPayment, getApprovedPayments, getPendingPayments, getRejectedPayments, reviewPayment, getPendingPaymentById } from './payment.controller.js';
import { createPaymentVal, reviewPaymentVal } from './payment.validation.js';


const paymentRouter = Router();

paymentRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER, roles.STAFF, roles.STUDENT]),
    cloudUploads().single('receiptImage'),
    isValid(createPaymentVal),
    asyncHandler(createPayment)
);

paymentRouter.patch('/reviewPayment/:paymentId',
    isAuthenticated(),
    isAuthorized([roles.MANAGER, roles.STAFF, roles.STUDENT, roles.DASHBOARD_ADMIN]),
    isValid(reviewPaymentVal),
    asyncHandler(reviewPayment)
);

paymentRouter.get('/approvedPayment',
    isAuthenticated(),
    isAuthorized([roles.MANAGER, roles.STAFF, roles.STUDENT]),
    asyncHandler(getApprovedPayments)
)

paymentRouter.get('/RejectedPayment',
    isAuthenticated(),
    isAuthorized([roles.MANAGER, roles.STAFF, roles.STUDENT]),
    asyncHandler(getRejectedPayments)
)

paymentRouter.get('/PendingPayment/:paymentId',
    isAuthenticated(),
    isAuthorized([roles.MANAGER, roles.STAFF, roles.STUDENT]),
    asyncHandler(getPendingPaymentById)
)

paymentRouter.get('/PendingPayment',
    isAuthenticated(),
    isAuthorized([roles.MANAGER, roles.STAFF, roles.STUDENT]),
    asyncHandler(getPendingPayments)
)


export default paymentRouter;
