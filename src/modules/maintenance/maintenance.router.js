import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { addMaintenanceVal } from "./maintenance.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addMaintenance, getMaintenance } from "./maintenance.controller.js";


const maintenanceRouter = Router()


//todo auth 
maintenanceRouter.post('/',
    isValid(addMaintenanceVal),
    asyncHandler(addMaintenance)
)

maintenanceRouter.get('/',
    asyncHandler(getMaintenance)
)


export default maintenanceRouter

