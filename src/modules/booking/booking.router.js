import { Router } from 'express';
import { createBooking } from './booking.controller.js';
import { createBookingVal } from './booking.validation.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { isValid } from '../../middleware/validation.js';

const bookingRouter = Router();

bookingRouter.post('/',
    //authenticate,
    isValid(createBookingVal),
    asyncHandler(createBooking)
)

export default bookingRouter;
