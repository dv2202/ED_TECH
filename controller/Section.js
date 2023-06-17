const mongoose = require('mongoose');
const Section = require('../models/Section');
const Course = require('../models/Course');
exports.createSection = async (req,res) =>{
    try{
        const {sectionName,courseId}= req.body ; 
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }
        //Create newSection
        const newSection = await Section.create({sectionName});
        //update course with section objectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{courseContent:newSection._id}
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to create Section Please Try Agian"
        })
    }
} 