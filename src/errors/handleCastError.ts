import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../utils/errorType";

export const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
    const statusCode = 400;
    const errorSource: TErrorSource = [
        {
            path: err.path,
            message: err.message
        }
    ]
    return {
        statusCode,
        message: 'invalid ID',
        errorSource
    }
}