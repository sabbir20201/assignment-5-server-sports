import express from "express"
import { facilityRoutes } from "./module/facility/facility.routes"
import { notFoundHandler } from "./middleware/notFoundHandler"
import { GlobalErrorHandler } from "./middleware/globalErrorHandler"
import { UserRoutes } from "./module/user/user.routes"
import { AuthRoutes } from "./module/auth/auth.routes"
import { CheckBookingRoutes } from "./module/checkAvailability/checkAvailability.routes"
import { BookingRoutes } from "./module/booking/booking.routes"
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())



app.use("/api/facility", facilityRoutes)
app.use("/api/auth", AuthRoutes)
app.use("/api/auth", UserRoutes)
app.use("/api/bookings", BookingRoutes)
app.use("/api/check-availability", CheckBookingRoutes)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(GlobalErrorHandler.globalErrorHandler)
app.use(notFoundHandler)

export default app

