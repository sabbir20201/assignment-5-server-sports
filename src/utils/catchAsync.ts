import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync =(asyncFn: RequestHandler)=>{

    return async(req:Request, res:Response, next: NextFunction)=>{
        
        Promise.resolve(asyncFn(req, res, next)).catch((error): void=>{

            next(error)
            
        })
    }
}
