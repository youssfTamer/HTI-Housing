import joi from "joi";
import { generalFields } from "../../middleware/validation.js";


export const addMaintenanceVal = joi.object({
    studentName: generalFields.String.required(),
    floorNumber: generalFields.Number.required(),
    apartment_room: generalFields.String.required(),
    maintenanceType: generalFields.String.required(),
    description: generalFields.description.required()
})

