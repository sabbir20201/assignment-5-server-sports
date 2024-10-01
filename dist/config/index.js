"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
    salt_round: process.env.SALT_ROUND,
};
function dotenvfun() {
    try {
        if (process.env.PORT) {
            console.log(process.env.PORT);
        }
    }
    catch (error) {
        console.log(error);
    }
}
dotenvfun();
