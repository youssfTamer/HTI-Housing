import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { addRoomVal } from "./room.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { createRoom, getAllRooms } from "./room.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";

const roomRouter = Router()

//add room todo auth authoriz

roomRouter.post('/',
    //isAuthenticated(),
    isValid(addRoomVal),
    asyncHandler(createRoom)
)

roomRouter.get('/',
    //isAuthenticated(),
    asyncHandler(getAllRooms)
)

export default roomRouter