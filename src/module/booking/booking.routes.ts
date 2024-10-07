import express from "express"
import { BookingControllers } from "./booking.controller"
import { auth } from "../../middleware/auth"

const router = express.Router()

router.post("/", auth(["user"]),BookingControllers.bookingAFacility)
router.get("/", auth(["admin"]),BookingControllers.getAllBookings)
router.get("/user", auth(["user"]),BookingControllers.getBookingByUser)
router.delete("/:id", auth(["user"]),BookingControllers.cancelABooking)

export const BookingRoutes = router