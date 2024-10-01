import { TFacility } from "./facility.interface";
import { FacilityModel } from "./facility.model";



const createFacilityIntoDB = async(payload: TFacility)=>{
    const facility = new FacilityModel(payload)
    const result = facility.save()
    return result
}


export const facilityServices  = {
    createFacilityIntoDB,

}