import dotenv from "dotenv"
dotenv.config();


export default  {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
    salt_round: process.env.SALT_ROUND,
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_Key,
    payment_url: process.env.PAYMENT_URL,
    payment_verify_url: process.env.PAYMENT_VERIFY_URL,
}



