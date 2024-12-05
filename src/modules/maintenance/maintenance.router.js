import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { addMaintenanceVal } from "./maintenance.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addMaintenance, getMaintenance } from "./maintenance.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";


const maintenanceRouter = Router()


//todo auth 
maintenanceRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
    isValid(addMaintenanceVal),
    asyncHandler(addMaintenance)
)

maintenanceRouter.get('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
    asyncHandler(getMaintenance)
)


export default maintenanceRouter

