import { TBooking } from "./booking.interface"
import { Booking } from "./booking.model"


const bookingInToDB = async (payload: TBooking) => {
    try {

        const result = await Booking.create(payload)
        return result
    } catch (error) {
        console.log(error);

    }
}

export const bookingService = {
    bookingInToDB
}