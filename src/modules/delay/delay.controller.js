import { Delay } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import cloudinary from "../../utils/cloud.js"
import { messages } from "../../utils/constant/messages.js"

export const addDelay = async (req, res, next) => {
    //get data from req
    const { selectedDays, fullName, fatherPhoneNumber, motherPhoneNumber, parentNationalId } = req.body
    //upload images
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: 'SHMS/delay'
    })
    //prepare object
    const delay = new Delay({
        selectedDays,
        fullName,
        fatherPhoneNumber,
        motherPhoneNumber,
        parentNationalId,
        image: { secure_url, public_id }
    })
    //add to db
    const createdDelay = await delay.save()
    if (!createdDelay) {
        req.failImage = { secure_url, public_id }
        return next(new AppError(messages.delay.failToCreate, 500))
    }
    //send response
    res.status(201).json({
        message: messages.delay.createdSuccessfully,
        success: true,
        data: createdDelay
    })

}

export const getDelays = async (req, res, next) => {
    const delayList = await Delay.find()
    res.status(200).json({
        success: true,
        data: delayList
    })
}