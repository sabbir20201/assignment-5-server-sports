import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
     res.json({
        success:false,
        message: 'this is from global',
        err: err
    })

}