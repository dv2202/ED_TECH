const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})

//function send mail
async function sendVerificationEmail(email,otp){
    try{
        const mailRespose = await mailSender(
            email,
            "Verification email from StudyNotion",
            emailTemplate(otp)
        );
        console.log("Mail response:",mailRespose);
    }
    catch(error){
        console.log("Error occured while send mail:",error);
        throw error;
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);

    if(this.isNew){
        await sendVerificationEmail(this.email,this.otp);
    }
    next();
})


module.exports = mongoose.model('OTP', otpSchema);