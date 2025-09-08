const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.protect = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message: "No token, authorization denied"})
    }
    try {
        const token =authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user =await User.findById(decoded.id).select("-password")
        if (!user) return res.status(401).json({message: "User not found"})
            req.user= user;
        next()
    } catch (error) {
        res.status(401).json({message : "Token Invalid",  error:err})
    }
}