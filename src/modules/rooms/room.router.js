import { Router } from "express";
import { cloudUploads } from "../../utils/multer-cloud.js";
import { isValid } from "../../middleware/validation.js";
import { addRoomVal } from "./room.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { createRoom } from "./room.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";

const roomRouter = Router()

//add room todo auth authoriz

roomRouter.post('/',
    isAuthenticated(),
    cloudUploads().fields([{ name: 'mainImage', maxCount: 1 }, { name: 'subImages', maxCount: 5 }]),
    isValid(addRoomVal),
    asyncHandler(createRoom)
)


export default roomRouter