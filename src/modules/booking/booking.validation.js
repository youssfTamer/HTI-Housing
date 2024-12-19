import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';


export const createBookingVal = joi.object({
    room: generalFields.objectId.required(),
    checkIn: joi.date().required(),
    checkOut: joi.date().required().min(joi.ref('checkIn')),
});
