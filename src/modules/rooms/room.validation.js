import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const addRoomVal = joi.object({
    roomNumber:generalFields.Number.required(),
    housingType:generalFields.String.required(),
    building:generalFields.String.required(),
    floor:generalFields.Number.required()
})