import { Router } from "express";
import { cloudUploads } from "../../utils/multer-cloud.js";
import { isValid } from "../../middleware/validation.js";
import { addDelayVal } from "./delay.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addDelay, getDelays } from "./delay.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";


const delayRouter = Router()

// auth todo
delayRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
    cloudUploads().single('image'),
    isValid(addDelayVal),
    asyncHandler(addDelay)
)

delayRouter.get('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
    asyncHandler(getDelays)
)

export default delayRouter