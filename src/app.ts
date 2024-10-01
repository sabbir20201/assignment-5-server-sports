import express from "express"
import { facilityRoutes } from "./module/facility/facility.routes"
import { notFoundHandler } from "./middleware/notFoundHandler"
import { globalErrorHandler } from "./middleware/globalErrorHandler"

const app = express()
app.use(express.json())



app.use("/api/facility", facilityRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(globalErrorHandler)
app.use(notFoundHandler)

export default app

