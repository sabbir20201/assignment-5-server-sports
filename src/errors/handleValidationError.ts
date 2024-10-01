import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../utils/errorType";

export const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
    const statusCode = 400;
    const errorSource: TErrorSource = Object.values(err.errors).map((value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: value?.path,
            message: value?.message,

        }
    }

    )
    return {
        statusCode,
        message: 'mongoose validation error',
        errorSource
    }
}