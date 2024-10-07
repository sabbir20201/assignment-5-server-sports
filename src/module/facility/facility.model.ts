import { model, Schema } from "mongoose";
import { TFacility } from "./facility.interface";

const facilitySchema = new Schema<TFacility>({
    image: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    pricePerHour: {
        type: Number,
        required: [true, 'Price hour is required']
    },
    location: {
        type: String,
        required: [true, 'location is required']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

export const Facility = model<TFacility>('Facility', facilitySchema) 
