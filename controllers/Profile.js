const Profile = require('../models/Profile');
const User = require('../models/User');
const { uploadImageToCloudinary } = require("../utils/imageUploader");


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

exports.getAllUserDetails = async (req,res) => {
    try{
        const id =  req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        console.log(userDetails);
        return res.status(200).json({
            success:true,
            message:"User Details fetched successfully",
            data:userDetails,
        })
    }
    catch(error){ 
        return res.status(500).json({
            success:false,
            message:"Unable to fetch Profile Please Try Agian"
        })
    }

}

exports.updateDisplayPicture = async (req,res) => {
    try{
        const displayPicture = req.files.displayPicture;
        const {userId} = req.user.id;
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NANME,
            1000,
            1000
        );
        console.log(image);
        const updatedProfile = await User.findByIdAndUpdate(
            {id:userId},
            {image:image.secure_url},
            {new:true}
        )
        res.send({
            success:true,
            message:"Profile Picture Updated Successfully",
            data:updatedProfile,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update Profile Please Try Agian"
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};