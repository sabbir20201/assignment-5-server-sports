import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../utils/errorType";

export const handledDuplicateError = (err: any): TGenericErrorResponse => {
    const statusCode = 400;
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1]
    const errorSource: TErrorSource = [
        {
            path: err.keyValue,
            message: `${extractedMessage} is already exist`,

        }
    ]
    return {
        statusCode,
        message: 'duplicate error',
        errorSource
    }
}