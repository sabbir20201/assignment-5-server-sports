import { Request, RequestHandler, Response } from "express";
import { Facility } from "../facility/facility.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { catchAsync } from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import httpStatus from "http-status";
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
const bookingAFacility: RequestHandler = catchAsync(async (req, res): Promise<any> => {

    const { _id, date, startTime, endTime } = req.body;
    console.log(_id, date, startTime, endTime);

    const userEmail = (req as any).user?.email;
    const userField = await User.findOne({ email: userEmail })
    if (!userField) {
        throw new Error("user not found")

    }
    const user = (userField as any)._id.toString()
    const isFacilityExists = await Facility.findOne({ _id: _id });
    console.log(isFacilityExists);

    if (!isFacilityExists) {
        return res.status(404).json({
            success: false,
            message: 'Facility not found'
        });

    }

    const requestedTimeSlot: TTimeSlot = { startTime, endTime }
    const isValidTimeSlot = availableTimeSlots.some(timeSlot =>
        timeSlot.startTime === requestedTimeSlot.startTime && timeSlot.endTime === requestedTimeSlot.endTime

    );
    if (!isValidTimeSlot) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: `invalid time slot requested. Available time slot :${availableTimeSlots.map(slot => `${slot.startTime}-${slot.endTime}`).join(', ')}`
        })
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
        return res.status(400).json({
            success: false,
            message: 'selected slot of time is not available for this facility item'
        });

    }


    // calculation if payable amount 
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    const payableAmount = durationHours * pricePerHour


    const data: TBooking = {
        facility: facilityId,
        date,
        startTime,
        endTime,
        user,
        payableAmount,
        isBooked: "confirmed",
    }

    const result = await bookingService.bookingInToDB(data);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "booking created successfully",
        data: result
    })

})

const getAllBookings: RequestHandler = catchAsync(async (req, res) => {

    const AllBookings = await Booking.find({ isBooked: "confirmed" })
        .populate({
            path: 'facility',
            select: "name image description pricePerHour location isDeleted"
        })
        .populate({
            path: "user",
            select: "name email phone role address"
        })
        .exec();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Bookings retrieved successfully",
        data: AllBookings
    })

})

const getBookingByUser: RequestHandler = catchAsync(async (req, res) => {
    // try {
    const userEmail = (req as any).user?.email;


    const userField = await User.findOne({ email: userEmail })
    if (!userField) {
        res.status(500).json({
            success: false,
            message: "user not found"
        })
        return
    }

    const findAUserBookings = await Booking.find({ user: userField._id })
        .populate({
            path: 'facility',
            select: "name description pricePerHour location isDeleted"
        })
        .exec();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Bookings retrieved successfully",
        data: findAUserBookings
    })
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         statusCode: 500,
    //         message: "no booking found",
    //     })
    // }
})



const cancelABooking: RequestHandler = catchAsync(async (req, res): Promise<any> => {
    // try {
    const userEmail = (req as any).user?.email;
    console.log(userEmail);
    
    const canceledId = req.params.id;
    console.log(canceledId);


    const userField = await User.findOne({ email: userEmail, })
    if (!userField) {
        res.status(500).json({
            success: false,
            message: "user not found"
        })
        return
    }

    const booking = await Booking.findOne({ user: userField._id, _id: canceledId })
        .populate({
            path: 'facility',
            select: "name description pricePerHour location isDeleted"
        })
        .exec();
    if (!booking) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: "Booking not found"
        })
        return
    }
    if (booking.isBooked === "canceled") {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: "Booking not found"
        })
        return
    }

    booking.isBooked = "canceled"
    await booking?.save()

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Bookings canceled successfully",
        data: booking
    })
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         statusCode: 200,
    //         message: "no booking found",
    //     })
    // }
})

export const BookingControllers = {
    bookingAFacility,
    getAllBookings,
    getBookingByUser,
    cancelABooking
}
