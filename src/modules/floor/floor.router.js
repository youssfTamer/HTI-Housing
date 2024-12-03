import { Router } from 'express';
import { createFloor, getFloors } from './floor.controller.js';
import { createFloorSchema, getFloorsSchema } from './floor.validatoin.js';
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isValid } from "../../middleware/validation.js";

const floorRouter = Router();

//todo

floorRouter.post('/', 
    isValid(createFloorSchema), 
    asyncHandler(createFloor));

floorRouter.get('/',
     isValid(getFloorsSchema),
      asyncHandler(getFloors));

export default floorRouter;
