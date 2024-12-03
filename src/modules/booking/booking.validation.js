import Joi from 'joi';
import { generalFields } from '../../middleware/validation.js';


export const createBookingVal = Joi.object({
    room: generalFields.objectId.required(),
    checkIn: Joi.date().required(),
    checkOut: Joi.date().required().min(Joi.ref('checkIn'))
});

 
