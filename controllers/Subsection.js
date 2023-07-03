const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
require('dotenv').config(); 

exports.createSubsection = async (req,res) =>{
    try{
        const {sectionId , title , description} = req.body;
        const video = req.files.video;        
        if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const uploadDetails = await uploadImageToCloudinary(
            video, 
            process.env.FOLDER_NAME);
            console.log(uploadDetails);
        const SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            video:uploadDetails.url,
        })
        const updatedSection = await Section.findByIdAndUpdate( {_id:sectionId},{
                                                                $push:{
                                                                        subsection:SubSectionDetails._id
                                                                }},
                                                                {new:true}).populate('subsection');
        return res.status(200).json({
            success:true,
            message:"Subsection created successfully",
            data:updatedSection,
        })                                      
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

exports.updateSubSection = async (req,res) => {
    try{
        const {sectionId , title , description}  = req.body;
        const subSection = await SubSection.findById(sectionId);
        if(!subSection){
            return res.status(400).json({
                success:false,
                message:"Subsection not found"
            })
        }
        if(title !== undefined){
            subSection.title = title;
        } 
        if(description !== undefined){
            subSection.description = description;
        }
        if(req.files && req.files.video !== undefined){
            const video = req.files.video;
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            );
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`;
        }
        await subsection.save();
        return res.json({
            success:true,
            message:"Subsection updated successfully",
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Update Subsection failed"
        })
    }
}

exports.deleteSubSection = async (req,res) => {
    try{
        const {sectionId , subSectionId} = req.body;
        await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $pull: {
                    subSection: subSectionId , 
                },
            }
        )
        const subSection = await SubSection.findByIdAndDelete({_id: subSectionId});

        if(!subSection){
            return res.status(400).json({
                success:false,
                message:"Subsection not found"
            })
        }
        
        return res.json({
            success: true,
            message: "SubSection deleted successfully",
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Delete Subsection failed"
        })
    }
}