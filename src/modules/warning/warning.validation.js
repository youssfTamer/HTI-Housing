import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'


export const addWarningVal = joi.object({
    name: generalFields.String.required(),
    room: generalFields.Number.required(),
    reason: generalFields.String.required()
})