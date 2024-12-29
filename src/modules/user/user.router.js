import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { isValid } from "../../middleware/validation.js";
import { roles } from "../../utils/constant/enums.js";
import { getAdmins, getStudentsApproved, getStudentsRejected, getStudentsWAA, updateUser } from "./user.controller.js";
import { updateUserVal } from "./user.validation.js";

const userRouter = Router();

// Route to get all users with role 'staff' or 'manager'
userRouter.get("/admins",
    isAuthenticated(),
    isAuthorized([roles.MANAGER, roles.STAFF, roles.STUDENT]),
    asyncHandler(getAdmins)
);

// Route to get all users with role 'student & waiting admin approve'
userRouter.get('/students',
    isAuthenticated(),
    isAuthorized([roles.MANAGER, roles.STAFF, roles.STUDENT, roles.DASHBOARD_ADMIN]),
    asyncHandler(getStudentsWAA)
);

// Route to get all users with role 'student & approved'
userRouter.get('/students/approved',
    isAuthenticated(),
    isAuthorized([roles.MANAGER, roles.STAFF, roles.STUDENT, roles.DASHBOARD_ADMIN]),
    asyncHandler(getStudentsApproved)
);

// Route to get all users with role 'student & rejected'
userRouter.get('/students/rejected',
    isAuthenticated(),
    isAuthorized([roles.MANAGER, roles.STAFF, roles.STUDENT, roles.DASHBOARD_ADMIN]),
    asyncHandler(getStudentsRejected)
);

// Route to update user's name or phone
userRouter.put("/users/:id",
    isAuthenticated(),
    isAuthorized([roles.MANAGER, roles.STAFF, roles.STUDENT]),
    isValid(updateUserVal),
    asyncHandler(updateUser)
);

export default userRouter;