import { Types } from "mongoose";
import { TUser } from "../user/user.interface";


export type TBooking = {
    facility: Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;
    user: TUser;
    payableAmount: number;
    transactionId: string
    isBooked: 'confirmed'| 'canceled';
}

