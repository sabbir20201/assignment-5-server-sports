import { Request, Response } from "express";
import { PaymentConfirmationServices } from "./payment.services";

const confirmationController = async (req: Request, res: Response) => {

    const {transactionId, status} = req.query
    const result = await PaymentConfirmationServices.confirmationService(transactionId as string, status as string)
    res.send(result)
}
export const PaymentController = {
    confirmationController
}