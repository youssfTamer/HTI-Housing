import { Router } from 'express';
import { createFloor, getFloors } from './floor.controller.js';
import { createFloorSchema, getFloorsSchema } from './floor.validatoin.js';
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isValid } from "../../middleware/validation.js";
import { isAuthenticated } from '../../middleware/authentication.js';
import { isAuthorized } from '../../middleware/authorization.js';
import { roles } from '../../utils/constant/enums.js';

const floorRouter = Router();

//todo

floorRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]), 
    isValid(createFloorSchema), 
    asyncHandler(createFloor));

floorRouter.get('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
     isValid(getFloorsSchema),
      asyncHandler(getFloors));

export default floorRouter;
