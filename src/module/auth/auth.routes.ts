import express from "express"
import { authController } from "../auth/auth.controller";
import { authValidation } from "./auth.validation";
import validateRequest from "../../middleware/validateRequest";


const router = express.Router();


router.post("/login",authController.login)


export const AuthRoutes = router