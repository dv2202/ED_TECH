const User = require('../models/User');
const OTP= require('../models/OTP');
require('dotenv').config();
const bcrypt = require('bcrypt');
const mailSender = require('../utils/mailSender');
//resetPasswordToken 
exports.resetPasswordToken = async (req, res) => {
   try{
    const {email} = req.body.email;
    const user = await User.findOne({email});
    if(!user){
        return res.json({
            success: false,
            message: 'User not found'
        })
    }
    const token = crypto.randomUUID();
    const updatedDetails = await User.findOneAndUpdate({email},
        {
        token:token,
        resetPasswordExpires: Date.now() + 5*60*1000 ,
        },
        {new:true}
    );
    const url = `https://localhost:3000/update-password/${token}`;
    await mailSender(email,
                    "Password reset Link",
                    `click on the link to reset your password ${url}`);
    return res.json({
        success: true,
        message: 'Password reset link sent to your email'
    })
   }
   catch(error){
        return res.status(500).json({
            success: false,
            message: error.message ,
        })
    }
}
//ResetPassword
exports.resetPassword = async (req, res) => {
    try{
        const {newPassword, confirmPassword, token} = req.body;
        if(!newPassword || !confirmPassword){
            return res.status(403).json({
                success: false,
                message: 'All fields are required'
            })
        }
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: 'Password and confirm password do not match'
            });
        }

        const userDetails = await user.findOne({token:token});
        if(!userDetails){
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            })
        }
        if(user.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success: false,
                message: 'Token expired'
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        )
    }
    catch(error){
        return res.status(500).json({       
            success: false,
            message: error.message ,
        })
    }
}