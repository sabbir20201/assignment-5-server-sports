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

const getAllFacilities = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await facilityServices.getAllFacilitiesFromDB()
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Facilities retrieved successfully',
        data: result
    })

})
const updateAFacility = catchAsync(async (req: Request, res: Response) => {

    const facilityId = req.params.id;
    const updateData = req.body;
    
    const result = await facilityServices.findAndUpdateFacilityIntoDB(facilityId, updateData)
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'facility updated successfully',
        data: result
    })

})
const deleteAFacility = catchAsync(async (req: Request, res: Response) => {


    const facilityId = req.params.id;

    const result = await facilityServices.deleteAFacilityIntoDB(facilityId)
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Facility deleted successfully',
        data: result
    })

})
export const facilityController = {
    createFacility,
    getAllFacilities,
    updateAFacility,
    deleteAFacility
}