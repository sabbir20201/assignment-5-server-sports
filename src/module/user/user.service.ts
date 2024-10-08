import { User } from "../user/user.model";
import { TUser } from "./user.interface";
// import { TLoginUser } from "./auth.interface";

const registerInToDB = async (payload: TUser) => {

    const newUser = await User.create(payload);
    return newUser
};
export const userServices = {
    registerInToDB,
}