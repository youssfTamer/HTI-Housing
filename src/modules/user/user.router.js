import { Router } from "express";
import { getAdmins, getStudents, updateUser } from "./user.controller.js";
import { updateUserVal } from "./user.validation.js";
import { isValid } from "../../middleware/validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";

const userRouter = Router();

// Route to get all users with role 'staff' or 'manager'
userRouter.get("/admins",
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
    asyncHandler(getAdmins)
);

// Route to get all users with role 'student'
userRouter.get('/students',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
    asyncHandler(getStudents)
);
 
// Route to update user's name or phone
userRouter.put("/users/:id",
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]), 
    isValid(updateUserVal),
    asyncHandler(updateUser)
);

export default userRouter;