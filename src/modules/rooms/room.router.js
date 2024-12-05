import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { addRoomVal } from "./room.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { createRoom, getAllRooms } from "./room.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";

const roomRouter = Router()

//add room todo auth authoriz

roomRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
    isValid(addRoomVal),
    asyncHandler(createRoom)
)

roomRouter.get('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
    asyncHandler(getAllRooms)
)

export default roomRouter