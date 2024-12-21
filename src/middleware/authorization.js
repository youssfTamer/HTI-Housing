import { AppError } from "../utils/appError.js"
import { messages } from "../utils/constant/messages.js"

export const isAuthorized = (roles, genders) => {
    return (req, res, next) => {
        if (!roles.includes(req.authUser.role)) {
            return next(new AppError(messages.user.notAuthorized, 401))
        }

        if (genders && !genders.includes(req.authUser.gender)) {
            return next(new AppError(messages.user.genderNotAuthorized, 403))
        }

        next()
    }
}

