const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadImageToCloudinary} =  require('../utils/imageUploader');
const CourseProgress = require("../models/CourseProgess")
const { convertSecondsToDuration } = require("../utils/secToDuration")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")

//create course handler 
exports.createCourse = async (req, res) => {
    try{
        //fetch data from body 
        const {courseName, courseDescription, whatYouWillLearn, price, category,status,instruction} = req.body;
        //get thumbnail
        const thumbnail = req.files.thumbnailImage;
        //validation 
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail ){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        // if(!status || status === undefined){
        //     status = "Draft";
        // }
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
        const categoryDetails =  await Category.findById(category);
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
            {_id:instructorDetails._id},
            {
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
exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
      console.log("Instructor ID : ",instructorId);
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
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
                            // .("ratengAndReview")
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


// Delete the Course
exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.StudentsEnrolled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }

  exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }

  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }