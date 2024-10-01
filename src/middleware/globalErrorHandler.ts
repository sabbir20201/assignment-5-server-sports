import e, { NextFunction, Request, Response } from "express";
import { TErrorSource } from "../utils/errorType";
import { ZodError, ZodIssue } from "zod";
import { handleZodError } from "../errors/handleZodError";
import { handleValidationError } from "../errors/handleValidationError";
import { handleCastError } from "../errors/handleCastError";




export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): any => {

    let statusCode = '' || 500;
    let message = err.message || 'something went wrong';    

    let errorSource: TErrorSource = [
        {
            path: '',
            message: 'something went wrong'
        }
    ]

   
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }else if(err?.name === 'ValidationError'){
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
        
    }else if(err?.name === 'CastError'){
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }


    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorSource,


    })

}

export const GlobalErrorHandler = {
    globalErrorHandler
}