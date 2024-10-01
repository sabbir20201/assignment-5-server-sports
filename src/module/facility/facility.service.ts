import { TFacility } from "./facility.interface";
import { FacilityModel } from "./facility.model";

const createFacilityIntoDB = async(payload: TFacility)=>{
    const facility = new FacilityModel(payload)
    const result = facility.save()
    return result
}

const getAllFacilitiesFromDB = async()=>{
    const result = await FacilityModel.find({isDeleted: false})
    return result
}
const  findAndUpdateFacilityIntoDB = async( id: string, payload: TFacility)=>{
    const updateFacility = await FacilityModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    })
    return updateFacility
}

const deleteAFacilityIntoDB  = async( id: string)=>{
    const deleteFacility = await FacilityModel.findByIdAndUpdate(id,{isDeleted: true}, {new: true})
    return deleteFacility
}
export const facilityServices  = {
    createFacilityIntoDB,
    getAllFacilitiesFromDB,
    findAndUpdateFacilityIntoDB,
    deleteAFacilityIntoDB
}