import axios from "axios"
import config from "../../config"

export const initiatePayment = async()=>{
    const response = await axios.post(config.payment_url!, {
        store_id: config.store_id,
        signature_key: config.signature_key,
        tran_id: "sabbir-123123175",
        success_url: "http://www.merchantdomain.com/sucesspage.html",
        fail_url: "http://www.merchantdomain.com/failedpage.html",
        cancel_url: "http://www.merchantdomain.com/cancellpage.html",
        amount: "10.0",
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: "Name",
        cus_email: "payer@merchantcusomter.com",
        cus_add1: "House B-158 Road 22",
        cus_add2: "Mohakhali DOHS",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1206",
        cus_country: "Bangladesh",
        cus_phone: "+8801704",
        type: "json"
    });
    console.log("response =>",response);
    return response.data
    
}