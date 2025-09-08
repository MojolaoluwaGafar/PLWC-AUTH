const jwt = require("jsonwebtoken")

const verifyToken= (token)=>{
    if (!token) {
     throw new Error("Token is missing")   
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error("invalid or expired token")
    }
}
module.exports = verifyToken