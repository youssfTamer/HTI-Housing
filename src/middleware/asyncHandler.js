import { AppError } from "../utils/appError.js"
import { deleteCloudImage } from "../utils/cloud.js"
import { deleteAccount } from "../utils/failCases.js"

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next)
            .catch((err) => { return next(new AppError(err, err.statusCode)) })
    }
}

export const globalErrorHandling = async (err, req, res, next) => {
    if (req.failImage) {
        await deleteCloudImage(req.failImage.public_id)
    }
    if (req.failImages?.lenght > 0) {
        for (const public_id of req.failImages) {
            await deleteCloudImage(public_id)
        }
    }
    return res.status(err.statusCode || 500).json({ message: err.message, success: false })
}