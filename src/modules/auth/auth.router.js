import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isValid } from "../../middleware/validation.js";
import { approveStudent, forgetPassword, login, logout, rejectStudent, resetPassword, signup, staffSignup, verifyAccount } from "./auth.controller.js";
import { forgetPasswordVal, loginVal, resetPasswordVal, signupVal, staffSignupVal } from "./auth.validation.js";

const authRouter = Router()


authRouter.post('/signup',
    isValid(signupVal),
    asyncHandler(signup)
)

authRouter.post('/staff/signup',
    isValid(staffSignupVal),
    asyncHandler(staffSignup)
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