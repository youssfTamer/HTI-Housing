import { Router } from 'express';
import { createBooking } from './booking.controller.js';
import { createBookingVal } from './booking.validation.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { isValid } from '../../middleware/validation.js';
import { isAuthenticated } from '../../middleware/authentication.js';
import { isAuthorized } from '../../middleware/authorization.js';
import { roles } from '../../utils/constant/enums.js';

const bookingRouter = Router();

bookingRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
    isValid(createBookingVal),
    asyncHandler(createBooking)
)

export default bookingRouter;
