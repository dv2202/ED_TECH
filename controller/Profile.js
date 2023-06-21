const Profile = require('../models/Profile');
const User = require('../models/User');
require('dotenv').config();

exports.updateProfile = async (req,res)=>{
     try{
        // get data 
        const {dateOfBirth="",about="",contactNumber,gender} = req.body;
        // get userid
        const userId = req.user.id;
        // validation
        if(!contactNumber || !gender){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        } 
        // find profile 
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        // updateprofile 
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        await profileDetails.save();
        // return response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profileDetails,
        })     
    }
     catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Unable to update Profile Please Try Agian"
            })
     }
}

exports.deleteAccount = async (req,res) => {
    try{
        // TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
        //Get UserID 
        const {userId} = req.user.id;
        //validation
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        //DeleteProfile
        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete(profileId);
        //User delete 
        await User.findByIdAndDelete(userId);
        // TODO : HW unenroll user from enrolled courses
        //return response
        return res.status(200).json({
            success:true,
            message:"Account deleted successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Account Please Try Agian"
        })
    }
}

exports.getProfile = async (req,res) => {
    try{
        const {userId} = req.user.id;
        const userDetails = await User.findById(userId).populate("additionalDetails");
        return res.status(200).json({   
            success:true,
            message:"Profile fetched successfully",
            userDetails,
        })        
        
    } 
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to fetch Profile Please Try Agian"
        })
    }
}