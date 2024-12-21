import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { isValid } from "../../middleware/validation.js";
import { roles } from "../../utils/constant/enums.js";
import { approveStudent, changePassword, dashboardLogin, dashboardSignup, forgetPassword, login, logout, rejectStudent, resetPassword, signup, staffSignup, verifyAccount } from "./auth.controller.js";
import { changePasswordVal, dashboardLoginVal, dashboardSignupVal, forgetPasswordVal, loginVal, resetPasswordVal, signupVal, staffSignupVal } from "./auth.validation.js";

const authRouter = Router()


authRouter.post('/signup',
    isValid(signupVal),
    asyncHandler(signup)
)

authRouter.post('/staff/signup',
    isValid(staffSignupVal),
    asyncHandler(staffSignup)
)

authRouter.post('/dashboard/signup',
    isValid(dashboardSignupVal),
    asyncHandler(dashboardSignup)
);

authRouter.get('/verify/:token',
    asyncHandler(verifyAccount)
)

authRouter.post('/login',
    isValid(loginVal),
    asyncHandler(login)
)

authRouter.post('/dashboard/login',
    isValid(dashboardLoginVal),
    asyncHandler(dashboardLogin)
);

authRouter.post('/forget-password',
    isValid(forgetPasswordVal),
    asyncHandler(forgetPassword)
)

authRouter.post('/reset-password',
    isValid(resetPasswordVal),
    asyncHandler(resetPassword)
)

authRouter.patch('/dashboard/change-password',
    isAuthenticated(),
    isAuthorized([roles.MANAGER, roles.STAFF, roles.STUDENT, roles.DASHBOARD_ADMIN]),
    isValid(changePasswordVal),
    asyncHandler(changePassword)
);

authRouter.patch('/admin/approve-student/:studentId',
    asyncHandler(approveStudent)
)

authRouter.patch('/admin/reject-student/:studentId',
    asyncHandler(rejectStudent)
)

authRouter.post('/logout', asyncHandler(logout))

export default authRouter