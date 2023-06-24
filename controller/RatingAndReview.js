const RatengAndReview = require('../models/ratingAndReview');
const Course = require("../models/Course");

//create rating 
exports.createRating = async (req, res) => {

    try{
        //get user id 
        const userId = req.user.id;
        //fetch data from req body 
        const {rating , review, courseId} = req.body;
        //check if user is enrolled or not  
        const courseDetails = await Course.findById({_id:courseId,
                                                    StudentsEnrolled:{$elemMatch:{$eq: userId
                                                    }}});
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in this course"
            });
        }
        //check if user already reveiwed or not
        const alreadyReviewed = await RatengAndReview.findOne({courseId:courseId, userId:userId});
        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: "Student already reviewed this course"
            })
        }
        //create new rating and review 
        const ratingReview = await RatengAndReview.create({
                        rating,review,course:courseId,userId:userId,  
        });
        //update course with this rating and review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                        {$push:{ratengAndReview:ratingReview._id}},
                                        {new:true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success: true,
            message: "Rating and review added successfully",
            ratingReview
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "failed to add rating and review",
            error:error.message
        })
    }
}

// get average rating 