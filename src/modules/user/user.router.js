import { Router } from "express";
import { getAdmins, getStudents, updateUser } from "./user.controller.js";
import { updateUserVal } from "./user.validation.js";
import { isValid } from "../../middleware/validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

const userRouter = Router();

// Route to get all users with role 'staff' or 'manager'
userRouter.get("/admins",
    asyncHandler(getAdmins)
);

// Route to get all users with role 'student'
userRouter.get('/students',
    asyncHandler(getStudents)
);
 
// Route to update user's name or phone
userRouter.put("/users/:id", 
    isValid(updateUserVal),
    asyncHandler(updateUser)
);

export default userRouter;