import { Maintenance } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"

export const addMaintenance = async (req,res,next)=>{
    //get data from body
    const {studentName,floorNumber,apartment_room,maintenanceType,description} = req.body
    //prepare data 
    const maintenance = new Maintenance({
        studentName,
        floorNumber,
        apartment_room,
        maintenanceType,
        description
    })
    //add to db
    const createdMaintenance = await maintenance.save()
    if(!createdMaintenance){
        return next(new AppError(messages.maintenance.failToCreate,400))
    }
    //send response
    return res.status(201).json({
        message:messages.maintenance.createdSuccessfully,
        success:true,
        data:createdMaintenance
    })
}

export const getMaintenance = async (req,res,next)=>{
    const mainList = await Maintenance.find()
    return res.status(200).json({
        success:true,
        data:mainList
    }) 
}