import express from 'express'
import { facilityController } from './facility.controller'
import validateRequest from '../../middleware/validateRequest'
import { facilityZodSchemaFile } from './facility.validation'

const router = express.Router()

router.get('/',facilityController.getAllFacilities)
router.post('/',validateRequest(facilityZodSchemaFile.facilityZodSchema),facilityController.createFacility)
router.put('/:id',validateRequest(facilityZodSchemaFile.facilityZodSchema), facilityController.updateAFacility)
router.delete('/:id',facilityController.deleteAFacility)

export const facilityRoutes = router 