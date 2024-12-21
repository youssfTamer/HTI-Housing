import express from 'express';
import { addWarning } from './warning.controller.js'; 
import { addWarningVal } from './warning.validation.js'; 
import { isValid } from '../../middleware/validation.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
const warningRouter = express.Router();


warningRouter.post('/',
    isValid(addWarningVal),
    asyncHandler(addWarning)     
); 


export default warningRouter;
