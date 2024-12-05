import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const getUsersVal = joi.object({
    // Define any query parameters validation if needed
});

export const updateUserVal = joi.object({
    name: generalFields.String.optional(),
    phone: generalFields.phone.optional(),
});
