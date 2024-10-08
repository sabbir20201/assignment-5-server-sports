import { NextFunction } from "express";
import { Facility } from "../facility/facility.model";
import { initiatePayment } from "../payment/payment.utils"
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface"
import { Booking } from "./booking.model"
interface TTimeSlot {
    startTime: string;
    endTime: string;
}

const availableTimeSlots: TTimeSlot[] = [
    { startTime: '08:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '12:00' },
    { startTime: '12:00', endTime: '14:00' },
    { startTime: '14:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '18:00' }
];

const bookingInToDB = async (payload: any, userEmail: string) => {
    try {

        const userField = await User.findOne({ email: userEmail })
        if (!userField) {
            throw new Error("user not found")

        }
        const user = (userField as any)._id.toString()
        const { _id, date, startTime, endTime } = payload
        const isFacilityExists = await Facility.findById({ _id: _id });
        console.log('isFacilityExists=>',isFacilityExists);

        if (!isFacilityExists) {

            throw new Error('Facility not found')
        }

        const requestedTimeSlot: TTimeSlot = { startTime, endTime }
        const isValidTimeSlot = availableTimeSlots.some(timeSlot =>
            timeSlot.startTime === requestedTimeSlot.startTime && timeSlot.endTime === requestedTimeSlot.endTime

        );

        if (!isValidTimeSlot) {
            throw new Error(`invalid time slot requested. Available time slot :${availableTimeSlots.map(slot => `${slot.startTime}-${slot.endTime}`).join(', ')}`)

        }

        const facilityId = (isFacilityExists as any)._id.toString();
        const pricePerHour = isFacilityExists.pricePerHour;

        const existingBookings = await Booking.find({
            facility: facilityId,
            date: date,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
            ]
        })

        if (existingBookings.length > 0) {
            throw new Error('selected slot of time is not available for this facility item')

        }


        // calculation if payable amount 
        const start = new Date(`${date}T${startTime}`);
        const end = new Date(`${date}T${endTime}`);
        const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        const payableAmount = durationHours * pricePerHour
        const transactionId = `TXN${Date.now()}`

        const booking = new Booking({
            facility: isFacilityExists,
            date,
            startTime,
            endTime,
            user: userField,
            payableAmount,
            status: 'Pending',
            paymentStatus: 'Pending',
            transactionId,
            isBooked: "confirmed",
        })
        await booking.save()
        //  payment 
        const paymentData = {
            transactionId,
            payableAmount,
            customerName:userField.name,
            customerEmail:userField.email,
            customerPhone:userField.phone,
            customerAddress:userField.address,
        }
        const paymentSession = await initiatePayment(paymentData)
        console.log("paymentSession=>", paymentSession);

        return paymentSession


    } catch (error) {


        throw error
    }
}

export const bookingService = {
    bookingInToDB
}