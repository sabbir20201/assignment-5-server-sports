import { readFileSync } from "fs";
import { Booking } from "../booking/booking.model"
import { verifyPayment } from "./payment.utils";
import { join } from "path";

const confirmationService = async (transactionId: string, status: string) => {
    const verifyResponse = await verifyPayment(transactionId)
    console.log('verifyResponse=>> ', verifyResponse);
    let result
    let message = "";
    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        result = await Booking.findOneAndUpdate({ transactionId }, {
            paymentStatus: 'Paid'
        })
        message = "Successfully paid"
    }else{
        message= "payment failed"
    }
    const filePath = join(__dirname, '../../views/confirmaion.html')
    let template = readFileSync(filePath, 'utf-8')
    template = template.replace('{{message}}', status)

    return `<h1>Payment ${status}</h1>`;
}

export const PaymentConfirmationServices = {
    confirmationService
}