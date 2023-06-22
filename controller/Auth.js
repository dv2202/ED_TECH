const User = require('../models/User');
const OTP= require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//send OTP
exports.sendOTP = async (req, res) => {
    try {
        const {email} = req.body;

        const checkUserPresent = await User.findone({email});

        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: 'User already exists'
            })
        }

        var otp = otp-generator.generate(6,{
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false
        })
        console.log("otp is ", otp);

        let result = await OTP.findOne({otp:otp});
        while(result){
             otp = otpGenerator.generate(6,{
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false
            })
            console.log("otp is ", otp);
    
             result = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email,otp};
        //create entry 
        const otpBody =  await OTP.create(otpPayload);
        console.log(otpBody);
        res.status(200).json({
            success: true,
            message: 'OTP sent successfully'
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: error.message ,
        })
    }
}
//Sign UP
exports.signUp = async (req, res) => {
   try{
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            acccoutType,
            contactNumber,
            } = req.body;
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success: false,
                message: 'All fields are required'
            })
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: 'Password and confirm password do not match'
            });
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success: false,
                message: 'User already exists'
            })
        }
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("Recent OTP -> " , recentOTP);
        if(recentOTP.length == 0){
            return res.status(401).json({
                success: false,
                message: 'OTP not sent'
            });
        }
        else if(otp !== recentOTP.otp){
            return res.status(400).json({
                success: false,
                message: 'Incorrect OTP'
            });
        }
        const profileDetails  = await Profile.create({
            gender:null,
            dateOfBirth:null,
            contactNumber:null,
            about:null,
        })
        const hashedPassword = await bcrypt.hash(password, 10);
        const userPayload = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails : profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastName}`}
        return res.status(200).json({   
            success: true,
            message: 'User created successfully'
        })
   } 
   catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered . PLease try again later" ,
        })
   }

}
//login
exports.login = async (req, res) => {
    try{
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const checkEmail = await User.findOne({email}).populate('additionalDetails');
        if(!checkEmail){
            return res.status(401).json({
                success: false,
                message: 'User does not exist'
            })
        }
        ;
        
        if(await bcrypt.compare(password, checkEmail.password)){
            const payload = {
                email: checkEmail.email,
                id: checkEmail._id,
                accountType: checkEmail.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '2h'});
            checkEmail.token = token;
            checkEmail.password  = undefined;
            const options = {
                expires: new Date(Date.now() + 3*34*60*60*1000),
                httpOnly: true,
            }
            res.cookir("token",token,options).statis(200).json({
                success: true,
                message: 'User logged in successfully',
                token,
                checkEmail
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: 'Incorrect password'
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "User cannot be logged in . PLease try again later" ,
        })
    }
}
//change password

exports.changePassword = async (req, res) => {
    try{
        const {newPassword,confirmPassword,oldPassword} = req.body;
        if(!newPassword || !confirmPassword || !oldPassword){
            return res.status(403).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const user = await User.findById(req.user.id);
        const isMatch = await user.comparePassword(oldPassword);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: 'Incorrect password'
            })
        }
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: 'Password and confirm password do not match'
            });
        }
        user.password = newPassword;
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Password cannot be changed . PLease try again later" ,
        })
    }
}