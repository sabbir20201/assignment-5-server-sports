import { NextFunction, Request, Response } from "express";
import { facilityServices } from "./facility.service";
import { catchAsync } from "../../utils/catchAsync";

// const createFacility = async (req: Request, res: Response,next:NextFunction) => {
//     try {
//         const facilityData = req.body;
//         console.log(facilityData);

//         const result = await facilityServices.createFacilityIntoDB(facilityData)
//         res.status(200).json({
//             success: true,
//             statusCode: 200,
//             message: 'facility is created successfully',
//             data: result
//         })
//     } catch (error:any) {
//         next(error)
//         // res.status(500).json({
//         //     success: false,
//         //     statusCode: 500,
//         //     errorMessage: (error as any).message,
//         //     errorMessage2: 'this is from try ctach',
//         //     error: error
//         // })
//     }
// }

const createFacility = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const facilityData = req.body;
    console.log(facilityData);

    const result = await facilityServices.createFacilityIntoDB(facilityData)
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'facility is created successfully',
        data: result
    })

})




export const facilityController = {
    createFacility,

}