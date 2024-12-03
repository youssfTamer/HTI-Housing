import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const addApartmentVal = joi.object({
    apartmentNumber: generalFields.Number.required(),
    numberOfRooms: generalFields.Number.required(),
    floor: generalFields.objectId.required(),
    building:generalFields.objectId.required(),
    services:generalFields.String.required(),
    roomType: generalFields.String.required(),
    status: generalFields.String.required(),
})

