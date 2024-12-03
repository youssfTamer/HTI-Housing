import Joi from 'joi';
import { roomStatus } from '../../utils/constant/enums.js';

export const createFloorSchema = Joi.object({
    floorNumber: Joi.number().min(0).required(),
    building: Joi.string().required(),
    status: Joi.string().valid(...Object.values(roomStatus)),
    totalApartments: Joi.number().min(0),
    totalRooms: Joi.number().min(0)
});

export const getFloorsSchema = Joi.object({
    building: Joi.string(),
    status: Joi.string().valid(...Object.values(roomStatus)),
    floorNumber: Joi.number().min(0)
});
