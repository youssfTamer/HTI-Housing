import { Router } from 'express';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { isAuthenticated } from '../../middleware/authentication.js';
import { isAuthorized } from '../../middleware/authorization.js';
import { isValid } from '../../middleware/validation.js';
import {roles} from '../../utils/constant/enums.js';
import { cloudUploads } from '../../utils/multer-cloud.js';
import { addHoliday, getHolidays } from './holiday.controller.js';
import { addHolidayVal } from './holiday.validation.js';

const holidayRouter = Router();

holidayRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER, roles.STAFF, roles.STUDENT]),
    cloudUploads().single('image'),
    isValid(addHolidayVal),
    asyncHandler(addHoliday)
);


holidayRouter.get('/',
    isAuthenticated(),
    isAuthorized([roles.MANAGER,roles.STAFF,roles.STUDENT]),
    asyncHandler(getHolidays)
);


export default holidayRouter;
