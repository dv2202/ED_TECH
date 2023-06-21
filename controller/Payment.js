const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail} = require('../mail/template/courseEnrollmentEmail');

exports.capturePayment = async (res,req)=>{

        const {courseId} = req.body;
        const userId = req.user.id;
        
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Course not found"
            });
        } 
        let course;
        try{
            course = await Course.findById(courseId);
            if(!course){
                return res.json({
                    success:false,
                    message:"Course not found"
                });
            }
            //user already p[ay for the same course --> converting string to object type
            const uid  = new mongoose.Types.ObjectId(userId);
            if(course.StudentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"You have already enrolled for this course"
                });
            }
        }
        catch(error) {
            console.error(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    const amount = course.price;
    const currency = "INR";
    const options = {
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId: courseId,
        }
    };
    try{
        //initiate the payment using razor pay 
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            message:"Payment initiated",
        });
    }
    catch(error){
        console.error(error);
        return res.json({
            success:false,
            message:error.message,
        });
    }

}