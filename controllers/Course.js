const Course = require('../models/Course');
const category = require('../models/Category');
const User = require('../models/User');
const {uploadImageToCloudinary} =  require('../utils/imageUploader');

//create course handler 
exports.createCourse = async (req, res) => {
    try{
        //fetch data from body 
        const {courseName, courseDescription, whatYouWillLearn, price, categorys,category,status,instruction} = req.body;
        //get thumbnail
        const thumbnail = req.files.thumbnailImage;
        //validation 
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !categorys || !thumbnail || !category){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        if(!status || status === undefined){
            status = "Draft";
        }
        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId, {accountType: "Instructor"});
        console.log("instructor Details : ",instructorDetails);

        if(!instructorDetails){
            return res.status(400).json({
                success: false,
                message: 'Instructor not found'
            });
        }

        //check given category is valid or not 
        const categoryDetails =  await category.findById(category);
        if(!categoryDetails){
            return res.status(400).json({
                success: false,
                message: 'category not found'
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
            category:categoryDetails._id,
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
        //update category ka schema 
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

exports.getCourseDetails = async (req, res) => {
    try{
       //get id
       const {courseId} = req.body;
       const details = await Course.findById({_id:courseId}).populate(
                                                                        {
                                                                            path:'instructor',
                                                                            populate:{
                                                                                path:"additionalDetails",
                                                                            }
                                                                        }
                                                            )
                                                            .populate("category")
                                                            .populate("ratengAndReview")
                                                            .populate({
                                                                path:"courseContent",
                                                                populate:{
                                                                    path:"subSection",
                                                                }
                                                            })
                                                            .exec();
        if(!details){
            return res.status(400).json({
                success: false,
                message: `could not find course with id ${courseId}`

            })
        }
        return res.status(200).json({
            success:true,
            message: 'Course details fetched successfully',
            data:details,
        })
    }
    catch(error){
        return res.status(500).json({   
            success: false,
            error: error.message ,
            message: 'failed to get course details'
        })
    }
}




