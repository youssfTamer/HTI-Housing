import joi from "joi";
import { generalFields } from "../../middleware/validation.js";


export const addDelayVal = joi.object({
    selectedDays: generalFields.String.required(),
    fullName: generalFields.String.required(),
    fatherPhoneNumber: generalFields.String.required(),
    motherPhoneNumber: generalFields.String.required(),
    parentNationalId: generalFields.Number.required(), // todo
})