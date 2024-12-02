import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { signupForStudent,verifyAccount,login, forgetPassword, resetPassword, handleStudentApproval } from "./auth.controller.js";
import { isValid } from "../../middleware/validation.js";
import { signupVal,loginVal, forgetPasswordVal, resetPasswordVal } from "./auth.validation.js";

const authRouter = Router()


authRouter.post('/signup',
    isValid(signupVal),
    asyncHandler(signupForStudent)
)

authRouter.get('/verify/:token',
    asyncHandler(verifyAccount)
)

//login
authRouter.post('/login',
    isValid(loginVal),
    asyncHandler(login)
)

authRouter.post('/forget-password',
    isValid(forgetPasswordVal),
    asyncHandler(forgetPassword)
)

authRouter.post('/reset-password',
    isValid(resetPasswordVal),
    asyncHandler(resetPassword)
)

authRouter.post('/admin/student-approval/:studentId',
    asyncHandler(handleStudentApproval)
)

export default authRouter