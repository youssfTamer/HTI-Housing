import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";
import { isValid } from "../../middleware/validation.js";
import { addApartmentVal } from "./apartment.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

const apartmentRouter = Router()
//todo
//add apartment
apartmentRouter.post('/',
    //isAuthenticated(),
    //isAuthorized(roles.MANAGER, roles.STAFF,roles.STUDENT),
    isValid(addApartmentVal),
    asyncHandler()
)

//get apartment

export default apartmentRouter