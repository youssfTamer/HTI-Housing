import { globalErrorHandling } from "./middleware/asyncHandler.js"
import { apartmentRouter, authRouter, bookingRouter, buildingRouter, delayRouter, floorRouter, housingRouter, maintenanceRouter, roomRouter, userRouter } from "./modules/index.js"

export const initApp = (app, express) => {
    //parsing data
    app.use(express.json())

    //Routing
    app.use('/room', roomRouter)
    app.use('/auth', authRouter)
    app.use('/building', buildingRouter)
    app.use('/maintenance', maintenanceRouter)
    app.use('/delay', delayRouter)
    app.use('/housing', housingRouter)
    app.use('/apartment', apartmentRouter)
    app.use('/floor', floorRouter)
    app.use('/booking', bookingRouter)
    app.use('/user', userRouter)

    //globalErrorHandling
    app.use(globalErrorHandling)
}