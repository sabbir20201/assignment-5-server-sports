
import { Request, Response } from "express";
import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { createToken } from "../../utils/createToken";
import { isPasswordMatched } from "../../utils/isPasswordMatched";
import { TLoginUser } from "./auth.interface";
import { authServices } from "./auth.service";



const login = catchAsync(async (req: Request, res: Response)=> {
 
        const userData = req.body;
        console.log(userData);
        
        const user = await authServices.loginFromDB(userData);
        // console.log(user);
    
        if (!user) {
            throw new Error("user not found")
        }
        const passwordMatch = await isPasswordMatched(
            userData.password,
            user.password
        )
        if (!passwordMatch) {
            throw new Error("password not matched");
        }
        const jwtPayload = {
            _id: user._id,
            email: user.email,
            role: user.role,
        }

        const token = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expire_in as string)
    
        const userLoginData = {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address
        }
        console.log(userLoginData);
    
        res.cookie('token', token, {
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User logged in successfully",
            //   user,
            token: token,
            data: userLoginData,
        })
})



 export const authController = {
    login
}