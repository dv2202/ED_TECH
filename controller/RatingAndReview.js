const RatengAndReview = require('../models/ratingAndReview');
const Course = require("../models/Course");
const ratingAndReview = require('../models/ratingAndReview');

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
exports.getAverageRating = async (res,req) => {
    try{ 
        const courseId = req.body.couseId;
        const result = await RatengAndReview.aggregate([
            {$match:
                {
                course: new mongoose.Types.ObjectId(courseId)//courseid humari string this use humne object id me convert kiya
                }
            },
            {
                $group :
                {
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
             
        ]);
        if(result.length>0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating
            })
        }
        else{
            return res.status(200).json({
                success:true,
                message: "Average Rating is 0 , no rating given till now",
                averageRating: 0,
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "failed to get average rating",
            error:error.message
        })
    }
}

//get all rating 
// exports.getAllRating = async (req,res) => {
//     try{
//         const courseId = req.body.courseId;
//         const allRating = await Course.findById({_id:courseId}).populate("ratingAndReview");
//         return res.status(200).json({
//             success: true,
//             message: "All rating and review",
//             allRating
//         })
//     }
//     catch(error){
//         return res.status(500).json({
//             success: false,
//             message: "failed to get all rating and review",
//             error:error.message
//         })
//     }
// }



//get all rating
exports.getAllRating = async (req,res) =>{
    try{
        const allReviews = await ratingAndReview.find({})
        .sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName lastName email image",
        })
        .populate({
            path:"course",
            select:"courseName"
        }).exec();
        return res.status(200).json({
            success: true,
            message: "All rating and review",
            data:allRating
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "failed to get all rating and review",
            error:error.message
        })
    }
}