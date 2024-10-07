import { NextFunction, Request, RequestHandler, Response } from "express";
import { facilityServices } from "./facility.service";
import { catchAsync } from "../../utils/catchAsync";


const createFacility:RequestHandler = catchAsync(async (req: Request, res: Response) => {

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

const getAllFacilities:RequestHandler = catchAsync(async (req: Request, res: Response) => {

    const result = await facilityServices.getAllFacilitiesFromDB()
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Facilities retrieved successfully',
        data: result
    })

})
const findAFacilityById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const result = await facilityServices.findAFacilityByIdFromDB(id)
        res.json({
            success: true,
            statusCode: 200,
            message: "a single product got successfully",
            data: result
        })
    } catch (error) {
        next()
    }
}
const updateAFacility:RequestHandler = catchAsync(async (req, res) => {

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
const deleteAFacility:RequestHandler = catchAsync(async (req, res) => {


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
    findAFacilityById,
    updateAFacility,
    deleteAFacility,
}