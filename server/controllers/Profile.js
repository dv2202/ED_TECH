const Course = require('../models/Course');
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

exports.deleteAccount = async (req, res) => {
    try {
      const id = req.user.id
      console.log(id)
      const user = await User.findById({ _id: id })
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }
      // Delete Assosiated Profile with the User
      await Profile.findByIdAndDelete({
        _id: new mongoose.Types.ObjectId(user.additionalDetails),
      })
      for (const courseId of user.courses) {
        await Course.findByIdAndUpdate(
          courseId,
          { $pull: { StudentsEnrolled: id } },
          { new: true }
        )
      }
      // Now Delete User
      await User.findByIdAndDelete({ _id: id })
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      })
      await CourseProgress.deleteMany({ userId: id })
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ success: false, message: "User Cannot be deleted successfully" })
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
        console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            {_id:userId},
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
            message: error.message,
            
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


exports.instructorDashboard = async (req, res) => {
    try {
      const courseDetails = await Course.find({ instructor: req.user.id })
      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.StudentsEnrolled.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price
  
        // Create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          // Include other course properties as needed
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
  
        return courseDataWithStats
      })
  
      res.status(200).json({ courses: courseData })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server Error" })
    }
  }