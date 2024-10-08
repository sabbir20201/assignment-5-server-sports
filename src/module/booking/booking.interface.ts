import { Types } from "mongoose";
import { TUser } from "../user/user.interface";


export type TBooking = {
    facility: Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;
    user:  Types.ObjectId;
    payableAmount: number;
    transactionId: string
    status: string;
    paymentStatus: string;
    isBooked: 'confirmed'| 'canceled';
}

