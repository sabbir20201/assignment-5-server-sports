import mongoose, { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

 const bookingSchema = new Schema({
    facility: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility',
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required:true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    payableAmount: {
        type: Number,
        required: true
    },
    isBooked: {
        type: String,
        enum: ['confirmed', 'canceled'],
    }
}) 


export const Booking = model<TBooking>('Booking', bookingSchema)