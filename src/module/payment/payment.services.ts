import { Booking } from "../booking/booking.model"
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string, status: string) => {
    const verifyResponse = await verifyPayment(transactionId)
    console.log('verifyResponse=>> ', verifyResponse);
    let result
    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        result = await Booking.findOneAndUpdate({ transactionId }, {
            paymentStatus: 'Paid'
        })
    }
    return `<h1>Payment ${status}</h1>`;
}

export const PaymentConfirmationServices = {
    confirmationService
}