import express from 'express'
import { facilityController } from './facility.controller'
import validateRequest from '../../middleware/validateRequest'
import { facilityZodSchemaFile } from './facility.validation'
import { auth } from '../../middleware/auth'

const router = express.Router()

router.get('/',facilityController.getAllFacilities)
router.get('/:id',facilityController.findAFacilityById)
router.post('/',facilityController.createFacility)
// auth(['admin']),validateRequest(facilityZodSchemaFile.facilityZodSchema)
router.put('/:id',auth(['admin']),validateRequest(facilityZodSchemaFile.facilityZodSchema), facilityController.updateAFacility)
router.delete('/:id',auth(['admin']),facilityController.deleteAFacility)

export const facilityRoutes = router 