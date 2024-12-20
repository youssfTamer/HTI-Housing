import { Building } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"

export const addBuildings = async (req, res, next) => {
    //get data from req
    const { name, address, floors, NOfloors, totalRooms, totalApartment, roomType, amenities, genderType, maxOccupancy } = req.body

    //check existenc
    const buildingExistenc = await Building.findOne({ name })
    if (buildingExistenc) {
        return next(new AppError(messages.building.alreadyExist, 409))
    }

    //prepare data
    const building = new Building({
        name,
        address,
        floors,
        NOfloors,
        totalRooms,
        totalApartment,
        roomType,
        amenities,
        genderType,
        maxOccupancy
    })
    //save to db
    const createdBuilding = await building.save()
    if (!createdBuilding) {
        return next(new AppError(messages.building.failToCreate, 500))
    }

    //send response
    res.status(201).json({
        message: messages.building.createdSuccessfully,
        success: true,
        data: createdBuilding
    })
}


export const getBuilding = async (req, res, next) => {
    const buildingId = req.params.id; // Assuming you're passing the building ID in the request params

    const building = await Building.findById(buildingId)
        .populate({
            path: 'floors', // Populate floors
            populate: {
                path: 'rooms' // Populate rooms in each floor
            }
        })
        .then(building => {
            if (!building) {
                return next(new AppError(messages.building.notFound, 404));
            }

            return res.status(200).json({
                success: true,
                data: building
            });
        });
};
