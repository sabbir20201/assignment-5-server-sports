import { model, Schema } from "mongoose";
import { USER_ROLE } from "./user.constant";
import config from "../../config";
import { TUser } from "./user.interface";
import bcrypt from 'bcryptjs';

const UserSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLE),
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
})

UserSchema.pre("save", async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.salt_round))
    next();
})
export const User = model<TUser>('User', UserSchema)