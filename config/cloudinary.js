const cloudinary = require('cloudinary').v2;
require('dotenv').config();

exports.cloudinaryConnect = () => {
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret:process.env.SECRET_KEY,
        })
    } 
    catch(error){
        console.log("Error in cloudinary Connect");
        console.log(error);
    }
}