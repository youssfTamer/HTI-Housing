import { Router } from "express";
import { cloudUploads } from "../../utils/multer-cloud.js";
import { isValid } from "../../middleware/validation.js";
import { addDelayVal } from "./delay.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addDelay, getDelays } from "./delay.controller.js";


const delayRouter = Router()

// auth todo
delayRouter.post('/',
    cloudUploads().single('image'),
    isValid(addDelayVal),
    asyncHandler(addDelay)
)

delayRouter.get('/',
    asyncHandler(getDelays)
)

export default delayRouter