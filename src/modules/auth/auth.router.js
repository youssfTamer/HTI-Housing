import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { verifyAccount,login, forgetPassword, resetPassword, approveStudent, rejectStudent, signup, logout } from "./auth.controller.js";
import { isValid } from "../../middleware/validation.js";
import { signupVal,loginVal, forgetPasswordVal, resetPasswordVal } from "./auth.validation.js";

const authRouter = Router()


authRouter.post('/signup',
    isValid(signupVal),
    asyncHandler(signup)
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

authRouter.post('/admin/approve-student/:studentId',
    asyncHandler(approveStudent)
)

authRouter.post('/admin/reject-student/:studentId',
    asyncHandler(rejectStudent)
)

authRouter.post('/logout', asyncHandler(logout))

export default authRouter