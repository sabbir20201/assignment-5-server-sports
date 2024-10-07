import { Request, RequestHandler, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { User } from "./user.model"
import { userServices } from "./user.service"
import { createToken } from "../../utils/createToken"
import { isPasswordMatched } from "../../utils/isPasswordMatched"
import config from "../../config"

const register: RequestHandler = catchAsync(async (req, res) => {

    const data = req.body
    const user = await User.findOne({ email: data?.email });
    if (user) {
        throw new Error("user already exists aa")
    }
    const result = await userServices.registerInToDB(data)

    // const tokenData = {
    //     email: data.email,
    //     role: data.role
    // }
    // const token = createToken(tokenData, config.jwt_access_secret as string,config.jwt_access_expire_in as string)

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User registered successfully",
        data: result,
    })

}
)


export const userController = {
    register,
}