import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";
import { isValid } from "../../middleware/validation.js";
import {asyncHandler} from "../../middleware/asyncHandler.js"
import { addBuildingVal } from "./building.validation.js";
import { addBuildings, getBuilding } from "./building.controller.js";

const buildingRouter = Router()

//todo
//add building
buildingRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
    isValid(addBuildingVal),
    asyncHandler(addBuildings)
)

//get building
buildingRouter.get('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
    asyncHandler(getBuilding)
)

export default buildingRouter