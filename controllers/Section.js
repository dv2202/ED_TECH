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

exports.updateSection = async (res,req)=>{
    try{
        const {sectionName,sectionId} = req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})

        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to update Section Please Try Agian"
        })
    }
}

exports.deleteSection = async (res,req)=>{
    try{
        //get id assuming we are send ID in params 
        const sectionId = req.body;

        await Section.findByIdAndDelete(sectionId);
        //TODO : do we need to delete the entry from course Schema ?? 
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section Please Try Agian"
        })
    }
}