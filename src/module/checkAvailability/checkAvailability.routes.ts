import { Router } from "express";
import checkAvailabilityTimeSlots from "./checkAvailability.controller";

const router = Router();

router.get('/', checkAvailabilityTimeSlots);


export const CheckBookingRoutes = router
