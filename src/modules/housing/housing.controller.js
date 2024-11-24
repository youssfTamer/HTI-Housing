import { Housing } from "../../../db/models/housing.model.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"

export const addHousing = async (req, res, next) => {
    //get data from req
    const { buildingName, numberOfBuildings, genderType } = req.body
    //prepare data
    const housing = new Housing({
        buildingName,
        numberOfBuildings,
        genderType
    })

    //add to db
    const createHousing = await housing.save()
    if (!createHousing) {
        return next(new AppError(messages.housing.failToCreate, 400))
    }

    //send response 
    res.status(201).json({
        message: messages.housing.createdSuccessfully,
        data: createHousing,
        success: true
    })
}

export const gethousing = async (req,res,next)=>{  
    const housingList = await Housing.find()
    return res.status(200).json({
         success:true,
         data:housingList
    }) 
   
}