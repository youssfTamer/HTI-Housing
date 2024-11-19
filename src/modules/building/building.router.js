import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";
import { isValid } from "../../middleware/validation.js";

const buildingRouter = Router()

buildingRouter.post('/',
    isAuthenticated(),
    isAuthorized(roles.MANAGER, roles.STAFF,roles.STUDENT),
    isValid()
)

export default buildingRouter