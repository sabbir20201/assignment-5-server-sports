import { NextFunction, Request, RequestHandler, Response } from "express";
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
// const bookingAFacility: RequestHandler = catchAsync(async (req, res): Promise<any> => {

//     const bookingData = req.body;
//     const userEmail = (req as any).user?.email;
//     console.log('bookingData>', bookingData);
    
//     const result = await bookingService.bookingInToDB(bookingData, userEmail);

//     res.status(200).json({
//         success: true,
//         statusCode: 200,
//         message: "booking created successfully",
//         data: result
//     })

// })
const bookingAFacility: RequestHandler = async (req, res): Promise<any> => {
try {
    const bookingData = req.body;
    const userEmail = (req as any).user?.email;
    console.log('bookingData>', bookingData);
    
    const result = await bookingService.bookingInToDB(bookingData, userEmail);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Booking created successfully",
        data: result
    })
} catch (error: any) {
    
    res.status(500).json({
        success: false,
        statusCode: 500,
        message: error?.message || 'internal server error ',
       error: error
    })
}
 

}

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
