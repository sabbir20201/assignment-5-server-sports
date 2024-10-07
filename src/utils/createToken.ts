
var jwt = require('jsonwebtoken');
export interface jwtPayload {
    email: string;
    role: 'ADMIN' | 'USER'
}
export const createToken = (payload:jwtPayload , secret: string, expireTime: string)=>{
    return jwt.sign(payload, secret, {
        expiresIn: expireTime
    })
}