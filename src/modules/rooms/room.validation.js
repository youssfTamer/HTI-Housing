import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'
import { roomType } from '../../utils/constant/enums.js'

export const addRoomVal = joi.object({
    roomNumber:generalFields.Number.required(),
    roomType:generalFields.String.valid(...Object.values(roomType)),
    building:generalFields.objectId.required(),
    floor:generalFields.objectId.required(),
    apartment:generalFields.objectId,
    price:generalFields.Number.required().min(0)
})