const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const {default: mongoose} = require('mongoose');

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
        //jaan much kar yha pe course id and user id pass kar rha hu taki isko mai signature verify karne ke time use kar saku
        notes:{
            courseId: courseId,
            userId,
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

exports.verifySignature = async (req,res)=>{
    const webhookSecret = "1234567890" ;

    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    //find checksum 
    shasum.update (JSON.stringify(req.body));
    const digest = shasum.digest ("hex");
    if(shasum === digest){
        console.log("Payment is Authorized");
         const {courseId, userId} = req.body.payload.payment.entity.notes;
         try{
            //fullfill action
            const enrolledCourse = await Course.findByIdAndUpdate({_id:courseId},{$push:{StudentsEnrolled:userId}},{new:true});
            if(!enrolledCourse){
                return res.status(400).json({
                    success:false,
                    message:"Course not found",
                });
            }

            console.log(enrolledCourse);
            const enrolledStudent = await User.findByIdAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true});

            console.log(enrolledStudent);

            //mail send kardo confirmations wala
            const emailResponse = await mailSender(
                                                    enrolledStudent.email, 
                                                    "Congratulations",
                                                    "on enrolling for the course",
                                                       
            )
            console.log(emailResponse);
            return res.status(200).json({
                success:true,
                message:"Payment successful",

            })
         }
         catch(error){
            return res.status(500).json({
                success:false,
                message:error.message,
            });
         }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Payment not authorized",
        })
    }
}