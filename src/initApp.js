import { globalErrorHandling } from "./middleware/asyncHandler.js"
import { authRouter, buildingRouter, delayRouter, maintenanceRouter, roomRouter } from "./modules/index.js"

export const initApp = (app, express) => {
    //parsing data
    app.use(express.json())

    //Routing
    app.use('/room', roomRouter)
    app.use('/auth', authRouter)
    app.use('/building', buildingRouter)
    app.use('/maintenance', maintenanceRouter)
    app.use('/delay', delayRouter)

    //globalErrorHandling
    app.use(globalErrorHandling)
}