import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";
import { isValid } from "../../middleware/validation.js";
import { addhousingVal } from "./housing.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addHousing, gethousing } from "./housing.controller.js";

const housingRouter = Router()

//auth todo 
housingRouter.post('/',
    //isAuthenticated(),
    //isAuthorized(roles.MANAGER, roles.STAFF),
    isValid(addhousingVal),
    asyncHandler(addHousing)
)


housingRouter.get('/',
    asyncHandler(gethousing)
)


export default housingRouter