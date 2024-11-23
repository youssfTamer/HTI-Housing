import { globalErrorHandling } from "./middleware/asyncHandler.js"
import { apartmentRouter, authRouter, buildingRouter, delayRouter, housingRouter, maintenanceRouter, roomRouter } from "./modules/index.js"

export const initApp = (app, express) => {
    //parsing data
    app.use(express.json())

    //Routing
    app.use('/room', roomRouter)
    app.use('/auth', authRouter)
    app.use('/building', buildingRouter)
    app.use('/maintenance', maintenanceRouter)
    app.use('/delay', delayRouter)
    app.use('/housing',housingRouter)
    app.use('/apartment',apartmentRouter)

    //globalErrorHandling
    app.use(globalErrorHandling)
}