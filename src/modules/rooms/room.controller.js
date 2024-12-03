import { Room } from "../../../db/index.js";
import { messages } from "../../utils/constant/messages.js";


export const createRoom = async (req, res, next) => {
    // Get data from request
    const { roomNumber, floor, apartment, building, roomType, price } = req.body;

    // Check existence
    const roomExistence = await Room.findOne({ roomNumber, floor });
    if (roomExistence) {
        return next(new AppError(messages.room.alreadyExist, 409));
    }

    // Prepare data
    const room = new Room({
        roomNumber,
        floor,
        building,
        apartment,
        roomType,
        price,
    });

    // Save to database
    const createdRoom = await room.save();
    if (!createdRoom) {
        return next(new AppError(messages.room.failToCreate, 500));
    }

    // Send response
    res.status(201).json({
        message: messages.room.createdSuccessfully,
        success: true,
        data: createdRoom
    });
};


export const getAllRooms = async (req, res, next) => {
    
    const roomList = await Room.find()

    return res.status(200).json({
        success: true,
        data: roomList
    })
}