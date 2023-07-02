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
    
}