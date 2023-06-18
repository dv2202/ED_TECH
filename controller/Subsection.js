const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
require('dotenv').config(); 

exports.Subsection = async (req,res) =>{
    try{
        const {sectionId , title , timeDuration , description} = req.body;
        const video = req.files.videoFile;        
        if(!sectioId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        const SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            video:uploadDetails.url,
        })
        const updatedSection = await Section.findByIdAndUpdate( {_id:sectionId},{
                                                                $push:{
                                                                        subsection:SubSectionDetails._id
                                                                }},
                                                                {new:true});
        return res.status(200).json({
            success:true,
            message:"Subsection created successfully",
            updatedSection,
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