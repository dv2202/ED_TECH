const Course = require('../models/Course');
const Tag = require('../models/Tag');
const User = require('../models/User');
const {uploadImageToCloudinary} =  require('../utils/imageUploader');

//create course handler 
exports.createCourse = async (req, res) => {
    try{
        //fetch data from body 
        const {courseName, courseDescription, whatYouWillLearn, price, tags} = req.body;
        //get thumbnail
        const thumbnail = req.files.thumbnailImage;
        //validation 
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tags || !thumbnail){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("instructor Details : ",instructorDetails);

        if(!instructorDetails){
            return res.status(400).json({
                success: false,
                message: 'Instructor not found'
            });
        }

        //check given tag is valid or not 
        const tagDetails =  await Tag.findById(tags);
        if(!tagDetails){
            return res.status(400).json({
                success: false,
                message: 'Tag not found'
            });
        }  
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an entry for new course 
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })
        //add the new course to the user schema of Instructor 
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},{
                $push:{
                    courses:newCourse._id
                }
            },
            {new:true}
        );
        //update tag ka schema 
        return res.status(200).json({
            success:true,
            message: 'Course created successfully',
            data:newCourse,
        })
      }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "failed to create a course",
            error:error.message 
        })
    }
}

//getall course handler function 
exports.getAllCourses = async (req, res) => {
    try{
        const allCourse = await Course.find({},{
                                                courseName:true,                       price:true,   
                                                thumbnail:true,
                                                instructor:true,
                                                ratingAndReview:true,
                                                studentsEnrolled:true,     
        }).populate("instructor").exec();
        return res.status(200).json({
            success:true,
            message: 'All courses fetched successfully',
            data:allCourse,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message ,
            message: 'failed to get all courses'
        })
    }
}