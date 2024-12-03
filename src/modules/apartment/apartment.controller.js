import { Apartment } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"

export const addApartment = async (req, res, next) => {
    //get data from req
    const { apartmentNumber, numberOfRooms, floorNumber, building, services, roomType, status } = req.body
    //check existenc
    const apartmentExist = await Apartment.findOne({ apartmentNumber, floorNumber })
    if (apartmentExist) {
        return next(new AppError(messages.apartment.alreadyExist, 409))
    }
    //prepare data
    const apartment = new Apartment({
        apartmentNumber,
        numberOfRooms,
        floorNumber,
        building,
        services,
        roomType,
        status
    })
    //save to db
    const createdAparment = await apartment.save()
    if (!createdAparment) {
        return next(new AppError(messages.apartment.failToCreate, 500))
    }
    //send response
    return res.status(201).json({
        message: messages.apartment.createdSuccessfully,
        success: true,
        data: createdAparment
    })
}


export const getApartment = async (req,res,next)=>{
    const apartmentList = await Apartment.find()

    return res.status(200).json({
        success: true,
        data: apartmentList
    })

}