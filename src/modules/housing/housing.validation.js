import joi from "joi";
import { generalFields } from "../../middleware/validation.js";


export const addhousingVal = joi.object({
    buildingName: generalFields.String.required(),
    numberOfBuildings: generalFields.Number.required(),
    genderType: generalFields.String.required(),
})
