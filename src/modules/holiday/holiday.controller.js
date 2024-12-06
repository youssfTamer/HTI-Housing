import { Holiday } from '../../../db/index.js'
import { AppError } from "../../utils/appError.js"
import cloudinary from "../../utils/cloud.js"
import { messages } from "../../utils/constant/messages.js"


export const addHoliday = async (req, res, next) => {
    // Get data from req
    const { fullName, fatherPhoneNumber, motherPhoneNumber, parentNationalId} = req.body;

    // Upload images
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: 'SHMS/holiday'
    });

    // Prepare object
    const holiday = new Holiday({
        fullName,
        fatherPhoneNumber,
        motherPhoneNumber,
        parentNationalId,
        image: { secure_url, public_id } // Assuming you want to store the image URL
    });

    // Add to db
    const createdHoliday = await holiday.save();
    if (!createdHoliday) {
        req.failImage = { secure_url, public_id };
        return next(new AppError(messages.holiday.failToCreate, 500));
    }

    // Send response
    res.status(201).json({
        message: messages.holiday.createdSuccessfully,
        success: true,
        data: createdHoliday
    });
};


export const getHolidays = async (req, res, next) => {
    const holidayList = await Holiday.find()
    res.status(200).json({
        success: true,
        data: holidayList
    })
}

