import { Warning } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"

export const addWarning = async (req, res, next) => {
    const { name, room, reason } = req.body

    const warningCount = 1;
    const warning = new Warning({
        name,
        room,
        reason,
        warningCount
    })

    const createdWarning = await warning.save()
    if (!createdWarning) {
        return next(new AppError(messages.warning.failToCreate, 500))
    }

    const existingWarning = await Warning.findOne({ name, room });
    if (existingWarning) {
        existingWarning.count += 1; // Increment the count
        await existingWarning.save(); // Save the updated warning
    }

    //send response
    res.status(201).json({
    message: messages.warning.createdSuccessfully,
    success: true,
    data: createdWarning
})
}