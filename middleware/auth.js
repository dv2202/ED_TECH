const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');


//auth
exports.auth = async (req, res, next) => {
    try{
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success: false,
                message: 'No token found'
            })
        }
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = decoded;
        }catch(error){
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: error.message ,
        })
    } 
}
//isStudent 
exports.isStudent = async (req, res, next) => {
    try{
        if(req.user.accountType === 'student'){
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for students only'
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message:"Role cannot be verified" ,
    })
}
}
//isInstructor 
exports.isInstructor = async (req, res, next) => {
    try{
        if(req.user.accountType === 'isInstructor'){
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for isInstructo only'
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message:"Role cannot be verified" ,
    })
}
}
//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
        if(req.user.accountType === 'isAdmin'){
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for isAdmin only'
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message:"Role cannot be verified" ,
    })
}
}