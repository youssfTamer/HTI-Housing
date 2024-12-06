import joi from 'joi';
import { generalFields } from '../../middleware/validation.js'; 

export const addHolidayVal = joi.object({
    fullName: generalFields.String.required(),
    fatherPhoneNumber: generalFields.String.required(),
    motherPhoneNumber: generalFields.String.required(),
    parentNationalId: generalFields.String.required(), 
});
