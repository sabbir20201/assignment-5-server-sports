import express from "express"
import { userController } from "./user.controller";
import { authController } from "../auth/auth.controller";


const router = express.Router();

router.post("/signup",userController.register);
// router.post("/login", authController.login)


export const UserRoutes = router