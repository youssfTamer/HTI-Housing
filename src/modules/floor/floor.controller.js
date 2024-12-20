import { Floor } from '../../../db/models/floor.model.js';
import { messages } from '../../utils//constant/messages.js';
import { AppError } from '../../utils/appError.js';

export const createFloor = async (req, res, next) => {
    // Get data from req
    const { floorNumber, building, rooms , status, totalApartments, totalRooms } = req.body;

    // Check existence
    const floorExistence = await Floor.findOne({ floorNumber, building });
    if (floorExistence) {
        return next(new AppError(messages.floor.alreadyExist, 409));
    }

    // Prepare data
    const floor = new Floor({
        floorNumber,
        building,
        rooms,
        status,
        totalApartments,
        totalRooms
    });

    // Save to db
    const createdFloor = await floor.save();
    if (!createdFloor) {
        return next(new AppError(messages.floor.failToCreate, 500));
    }

    // Send response
    res.status(201).json({
        message: messages.floor.createdSuccessfully,
        success: true,
        data: createdFloor
    });
};

export const getFloors = async (req, res, next) => {
    const floorList = await Floor.find()
        .populate('roomDetails');

    return res.status(200).json({
        success: true,
        data: floorList
    });
};
