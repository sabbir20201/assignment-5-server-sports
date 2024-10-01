import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const statusCode = httpStatus.NOT_FOUND
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: "Api not found"
    })
}
