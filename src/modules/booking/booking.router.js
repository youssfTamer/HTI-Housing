import { Router } from 'express';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { isAuthenticated } from '../../middleware/authentication.js';
import { isAuthorized } from '../../middleware/authorization.js';
import { isValid } from '../../middleware/validation.js';
import { roles } from '../../utils/constant/enums.js';
import { cloudUploads } from "../../utils/multer-cloud.js";
import { createBooking } from './booking.controller.js';
import { createBookingVal } from './booking.validation.js';

const bookingRouter = Router();

bookingRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
    //cloudUploads().single('receiptImage'),
    isValid(createBookingVal),
    asyncHandler(createBooking)
)

export default bookingRouter;
