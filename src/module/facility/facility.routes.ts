import express from 'express'
import { facilityController } from './facility.controller'

const router = express.Router()

router.post('/', facilityController.createFacility)


export const facilityRoutes = router 