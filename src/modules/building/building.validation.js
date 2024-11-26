import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const addBuildingVal = joi.object({
    name: generalFields.String.required(),
    address: generalFields.String.required(),
    floors: generalFields.Number.required(),
    totalRooms:generalFields.Number.required(),
    totalApartment:generalFields.Number.required(),
    roomType: generalFields.String.required(),
    amenities: generalFields.String.required(),
    genderType: generalFields.String.required(),
    maxOccupancy: generalFields.Number,
    
})

