import { User } from "../../db/index.js"
import { AppError } from "../utils/appError.js"
import { status } from "../utils/constant/enums.js"
import { messages } from "../utils/constant/messages.js"
import { verifyToken } from "../utils/token.js"

export const isAuthenticated = () => {
    return async (req, res, next) => {
        //token
        const { token } = req.headers
        //verify token
        const payload = verifyToken({ token })
        if (payload.message) {
            return next(new AppError(payload.message, 401))
        }
        //check exsit
        const authStudent =await User.findOne({ _id: payload._id, status: status.VERIFIED })
        if(!authStudent){
            return next(new AppError(messages.student.notFound,404))
        }
        
        req.authStudent = authStudent
        next()
    }
}

