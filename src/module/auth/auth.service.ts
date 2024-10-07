import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginFromDB = async (payload: TLoginUser)=>{
    const user = await User.findOne({email: payload.email});
    return user
}


export const authServices = {
    loginFromDB
}